import Head from 'next/head'
import Hero from '../components/Home/Hero'
import Container from '../components/shared/Container'

export default function Home() {
  return (
    <>
      <Head>
        <title>DeBut - Pandemi Gabut</title>
        <meta name="title" content="DeBut - Pandemi Gabut" />
        <meta name="description" content="Tired with COVID-19 News? Get Covid Info with Fun now! Challenge yourself. See your future predictions, according to your knowledge of the plague. [of course it's just a joke]" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="DeBut - Pandemi Gabut" />
        <meta property="og:description" content="Tired with COVID-19 News? Get Covid Info with Fun now! Challenge yourself. See your future predictions, according to your knowledge of the plague. [of course it's just a joke]" />
        <meta property="og:image" content="https://i.ibb.co/mFytzFs/Frame-30.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="DeBut - Pandemi Gabut" />
        <meta property="twitter:description" content="Tired with COVID-19 News? Get Covid Info with Fun now! Challenge yourself. See your future predictions, according to your knowledge of the plague. [of course it's just a joke]" />
        <meta property="twitter:image" content="https://i.ibb.co/mFytzFs/Frame-30.png" />
      </Head>
      <Container style={{backgroundColor: 'white'}}>
        <Hero />
      </Container>
    </>
  )
}
