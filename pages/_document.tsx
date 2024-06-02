import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Script src="https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/cdn/metamask-sdk.js"></Script>
          <div className="gtranslate_wrapper"></div>

          <script
            src="https://cdn.gtranslate.net/widgets/latest/float.js"
            defer
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.gtranslateSettings = {"default_language":"en","native_language_names":true,"languages":["en","tr","ru","uk","de","ar","es","ko","zh-CN"],"wrapper_selector":".gtranslate_wrapper","switcher_horizontal_position":"right"}
            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
