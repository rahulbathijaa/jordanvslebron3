import modal
import os
from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from modal import asgi_app  # New import

MODEL_PATH = "meta-llama/Meta-Llama-3.1-8B-Instruct"
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

llm_image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install("transformers", "torch", "accelerate", "fastapi", "uvicorn", "fastapi-cors")
)

volume = modal.Volume.from_name("llm-model-volume", create_if_missing=True)

modal_app = modal.App("llm-inference")

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.jordanvslebron.com", "https://jordanvslebron.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@modal_app.cls(
    gpu="a10g",
    image=llm_image,
    volumes={"/root/model_cache": volume},  # Changed the volume mount path
    mounts=[modal.Mount.from_local_dir(".", remote_path="/root/app")]
)
class LLMInference:
    @modal.enter()
    def setup(self):
        from transformers import AutoModelForCausalLM, AutoTokenizer

        cache_dir = "/root/model_cache"
        os.makedirs(cache_dir, exist_ok=True)

        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH, use_auth_token=ACCESS_TOKEN, cache_dir=cache_dir)
        self.model = AutoModelForCausalLM.from_pretrained(MODEL_PATH, use_auth_token=ACCESS_TOKEN, cache_dir=cache_dir)
        self.tokenizer.pad_token = self.tokenizer.eos_token

    @modal.method()
    def generate(self, message):
        from torch import no_grad

        inputs = self.tokenizer(message, return_tensors="pt", padding=True, truncation=True)

        # Use torch.no_grad() to speed up inference
        with no_grad():
            outputs = self.model.generate(
                inputs.input_ids,
                attention_mask=inputs.attention_mask,
                max_length=50,  # Reduced from 100 to 50
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True,
                top_p=0.9,  # Added top_p for nucleus sampling
                num_beams=1,  # Using beam search with num_beams=1 for faster generation
            )

        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response.split("AI:")[-1].strip()

llm = LLMInference()

@app.post("/api/chat")
async def chat_endpoint(message: Message):
    prompt = message.message.lower()
    # Check for specific questions
    if any(phrase in prompt for phrase in ["who's the goat", "whos the goat", "who is the goat", "who's the greatest", "whos the greatest ever", "who is the greatest"]):
        return {"response": "That's for you to decide ;)"}
    else:
        # Call the generate method without await
        response = llm.generate.remote(f"Human: {message.message}\nAI:")
        return {"response": response}

@modal_app.function()  # New decorator
@asgi_app()  # New decorator
def fastapi_app():
    return app

if os.getenv("VERCEL"):
    @app.on_event("startup")
    async def startup_event():
        modal_app.run()

@modal_app.local_entrypoint()
def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    modal.run()
