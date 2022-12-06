import Document,
{
  Html,
  Head, Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document';

class WebAppDocument extends Document {
  render() {
    const jsonLdData = JSON.stringify({
      '@context': 'http://',
      '@type': 'Organization',
      name: 'Symentix',
      url: 'https://',
      logo: 'https://',
      image: 'https://',
      description: '',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'full address',
        addressRegion: 'region',
        postalCode: 'xxxxxxx',
        addressCountry: 'Nation name'
      },
      contactPoint: {
        '@type': '',
        telephone: 'xxx xxx xxxx',
        contactType: 'Customer Support'
      }
    });

    return (
      <Html>
        <Head>
          <title>Three - Refund</title>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <meta
            name='robots'
            content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          />
          <meta
            name='description'
            content=''
          />
          <link
            rel='canonical'
            href='https://'
          />
          <meta property='og:locale' content='en_US' />
          <meta property='og:type' content='article' />
          <meta
            property='og:title'
            content=''
          />
          <meta
            property='og:description'
            content=''
          />
          <meta
            property='og:url'
            content='https://'
          />
          <meta property='og:site_name' content='Symentix' />
          <meta
            property='article:modified_time'
            content='1970-01-01T00:00:00+00:00'
          />
          <meta
            property='og:image'
            content='https://example.com'
          />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='640' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:label1' content='Est. reading time' />
          <meta name='twitter:data1' content='0 minutes' />
          <meta name='generator' content='Site Kit by Google 1.43.0' />

          <script type='application/ld+json'>{jsonLdData}</script>

          <link rel="icon" href="/images/logo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WebAppDocument;