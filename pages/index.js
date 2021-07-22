import groq from 'groq'
import Head from 'next/head'
import client from '../client'
import BackgroundIssues from '../components/Home/BackgroundIssues'
import Contribute from '../components/Home/Contribute'
import Guide from '../components/Home/Guide'
import Hero from '../components/Home/Hero'
import Quiz from '../components/Home/Quiz'
import Container from '../components/shared/Container'

export default function Home({quiz}) {
  if (!quiz) {
    return <p className='text-center'>Loading...</p>
  }

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
        <Quiz quiz={quiz} />
        <Guide />
        <BackgroundIssues />
        <Contribute />
      </Container>
    </>
  )
}

const quizQuery = groq`
    *[_type == "quiz"][0..3] {
        title,
        'slug': slug.current,
        mainImage
    }
`

export async function getServerSideProps(context) {
    const quiz = await client.fetch(quizQuery)

    return {
        props: {
            quiz: [...quiz, quiz[0]]
        }, // will be passed to the page component as props
    }
}