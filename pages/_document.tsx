import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>pixelpxed</title>
      </Head>
      <body className="min-h-dvh antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
