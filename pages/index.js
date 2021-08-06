import groq from 'groq'
import client from '../client'
import BackgroundIssues from '../components/Home/BackgroundIssues'
import Contribute from '../components/Home/Contribute'
import Guide from '../components/Home/Guide'
import Hero from '../components/Home/Hero'
import Quiz from '../components/Home/Quiz'
import Container from '../components/shared/Container'
import CustomHead from '../components/shared/CustomHead'

export default function Home({quiz}) {
  if (!quiz) {
    return <p className='text-center'>Loading...</p>
  }

  return (
    <>
      <CustomHead
        title="DeBut - Pandemi Gabut"
        description="Tired with COVID-19 News? Get Covid Info with Fun now! Challenge yourself. See your future predictions, according to your knowledge of the plague. [of course it's just a joke]"
        url="https://debut.vercel.app"
      />
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
    *[_type == "quiz"][0..2] | order(_createdAt desc) {
        title,
        'slug': slug.current,
        mainImage
    }
`

export async function getServerSideProps(context) {
    const quiz = await client.fetch(quizQuery)

    return {
        props: {
            quiz
        }, // will be passed to the page component as props
    }
}