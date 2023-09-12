import React from 'react';
import Head from 'next/head';
import styles from '../styles/styles.module.css'; // Import your CSS module
import statsData from '../data/statsData'; // Import the stats data
import qandaData from '../data/qandaData'; // Import the Q&A data
import Image from 'next/image'; // Import the Image component for optimized image loading

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jordan vs LeBron</title>
         <meta
            name="description"
            content="Who's the GOAT? Jordan or LeBron? Find out more about their individual regular season and playoff stats to decide on your own."
          />
      </Head>
       <style global jsx>
        {`
          body {
            margin: 0;
            background-color: #000000;
          }
        `}
      </style>

      {/* Your existing code goes here */}
      <div>
        {/* Navigation Bar */}
        <nav className={`${styles.navbar} ${styles['navbar-left']}`}>
          <div className={styles['navbar-button']}>
            <div className={styles['button-content']}>
              <span>Jordan vs LeBron</span>
            </div>
          </div>
          <div className={styles['navbar-right']}>
            <a className={styles['navbar-link']} href="https://twitter.com/rahulbathijaa">Contact</a>
          </div>
          {/* Line underneath buttons */}
          <div className={styles['navbar-line']}></div>
        </nav>
      </div>
      <header className={styles.header}>
        <div className={styles['header-item']}>
          <div className={styles['image-container']}>
            <Image className={styles['left-image']} src="/jordan.png" alt="Jordan" width={400} height={400} />
          </div>
          <div className={styles['text-container']}>
            <h1>Jordan <span className={styles['vs-lowercase']}>vs</span> LeBron</h1>
            <p>A head to head comparison of Michael Jordan and LeBron James</p>
          </div>
          <div className={styles['image-container']}>
            <Image className={styles['right-image']} src="/lebron.png" alt="LeBron" width={400} height={400} />
          </div>
          <div className={styles['header-line']}></div>
        </div>
      </header>

      {/* Render your statsData */}
      {/* {statsData.map((section, index) => (
        <section key={index} className={styles['stats-section']}>
          <h2>{section.sectionTitle}</h2>
          {section.data.map((item, itemIndex) => (
            <div key={itemIndex} className={styles['scoreboard']}>
              <div className={styles['scoreboard-item-image']}>
                <Image src="/divider.png" alt="Image" width={400} height={400} />
              </div>
              <div className={styles['scoreboard-item-container']}>
                <div className={`${styles['scoreboard-item']} ${item.scoreComparison === 'left' ? styles['with-arrow'] : ''}`}>
                  {item.scoreComparison === 'left' && <Image className={styles['score-arrow']} src="/leftarrow.png" alt="Left Arrow" width={20} height={20} />}
                  {item.leftScore}
                </div>
                <div className={`${styles['scoreboard-item']} ${styles['stat-title']} ${item.scoreComparison === 'left' ? styles['higher-score'] : (item.scoreComparison === 'right' ? styles['lower-score'] : '')}`}>
                  <div className={`${styles['score-title-content']} ${item.scoreComparison === 'right' ? styles['justify-end'] : ''}`}>
                    {item.statTitle}
                  </div>
                </div>
                <div className={`${styles['scoreboard-item']} ${item.scoreComparison === 'right' ? styles['with-arrow'] : ''}`}>
                  {item.rightScore}
                  {item.scoreComparison === 'right' && <Image className={styles['score-arrow']} src="/rightarrow.png" alt="Right Arrow" width={20} height={20} />}
                </div>
              </div>
            </div>
          ))}
        </section>
      ))} */}

{statsData.map((section, index) => (
  <section key={index} className={styles['stats-section']}>
    <h2>{section.sectionTitle}</h2>
    {section.data.map((item, itemIndex) => (
      <div key={itemIndex} className={styles['scoreboard']}>
       <div className={styles['scoreboard-item-image']}>
  <Image
    src="/divider.png"
    alt="Image"
    layout="responsive"
    width={200}
    height={200}
  />
</div>


  <div className={styles['scoreboard-item-container']}>
          <div className={`${styles['scoreboard-item']} ${styles['left-score']}`}>
               {/* {item.scoreComparison === 'left' && (
    <div className={styles['score-arrow-left-arrow-container']}>
              <Image 
                  className={styles['score-arrow-left-arrow']} 
                  src="/leftarrow.png"
                  alt="Left Arrow" 
                  layout="responsive"
                  width={30}
                  height={30} />
      </div>
            )} */}
            {item.leftScore}
         </div>
            {/* {item.scoreComparison === 'left' && ( */}
        
   {/* {item.scoreComparison === 'left'} */}
        

    {/* <div className={`${styles['scoreboard-item']} ${styles['left-score']}`}>
     {item.leftScore}
      {item.scoreComparison === 'left' && (
      <div className={styles['score-arrow-left-arrow-container']}>
        <Image
          className={styles['score-arrow-left-arrow']}
          src="/leftarrow.png"
          alt="Left Arrow"
          layout="responsive"
          width={30}
          height={30}
        />
      </div>
    )}
  </div> */}
    
          <div className={`${styles['scoreboard-item']} ${styles['stat-title']}`}>
            {/* <div className={`${styles['score-title-content']} ${item.scoreComparison === 'right' ? styles['justify-end'] : ''}`}> */}
              {item.statTitle}
            {/* </div> */}
          </div>

<div className={`${styles['scoreboard-item']} ${styles['right-score']}`}>
  {item.rightScore}
  {item.scoreComparison === 'right' && (
    <div className={styles['score-arrow-right-arrow-container']}>
      <Image
        className={styles['score-arrow-right-arrow']}
        src="/rightarrow.png"
        alt="Right Arrow"
        layout="responsive"
        width={30}
        height={30}
      />
    </div>
  )}
    </div>
  </div>
</div>
    ))}
  </section>
))} 


      {/* Render your qandaData */}
      <section className={styles['qanda-section']}>
        <h2>FAQs</h2>
        {qandaData.map((qaPair, index) => (
          <div key={index} className={styles['qa-item']}>
            <h3 className={styles['question']}>{qaPair.question}</h3>
            <p className={styles['answer']} dangerouslySetInnerHTML={{ __html: qaPair.answer }} />
          </div>
        ))}
      </section>

      <footer className={styles['footer']}>
        <div className={styles['footer-left']}>
          <span>Built by Rahul Bathija</span>
        </div>
        <div className={styles['footer-right']}>
          <a className={styles['navbar-link']} href="https://twitter.com/rahulbathijaa">Contact</a>
        </div>
        <div className={styles['footer-line']}></div>
      </footer>
    </div>
  );
}
