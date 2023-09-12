import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          {/* <link rel="icon" type="/favicon.ico" href="/favicon.svg" /> */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          {/* <title>Jordan vs LeBron | All Time Stats Comparison</title>
          <meta
            name="description"
            content="Who's the GOAT? Jordan or LeBron? Find out more about their individual regular season and playoff stats to decide on your own."
          /> */}
          {/* Add the Google Fonts links for Roboto Flex, Libre Franklin, Overpass, and Handjet */}
          {/* Add the Google Fonts links */}
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          {/* Handjet Thin */}
          <link
            href="https://fonts.googleapis.com/css2?family=Handjet:wght@100;200;300;500&family=Roboto+Flex:opsz,wght@8..144,400;8..144,700&family=Tomorrow:wght@500&display=swap"
            rel="stylesheet"
          />

          {/* Tomorrow Medium */}
          <link
            href="https://fonts.googleapis.com/css2?family=Tomorrow:wght@500&display=swap"
            rel="stylesheet"
          />

          {/* Roboto Flex Bold */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <div id="root">
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
