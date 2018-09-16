import Document, { Head, Main, NextScript } from 'next/document'
import '../asserts/styles.less'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <meta charSet='utf-8' />
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}