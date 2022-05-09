import groq from 'groq'
import client from '../client'
import BackgroundIssues from '../components/Home/BackgroundIssues'
import Contribute from '../components/Home/Contribute'
import Guide from '../components/Home/Guide'
import Hero from '../components/Home/Hero'
import Quiz from '../components/Home/Quiz'
import Container from '../components/shared/Container'
import CustomHead from '../components/shared/CustomHead'
import Spinner from '../components/shared/Spinner'

export default function Home({ quiz }) {
  if (!quiz) {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Spinner purple width='30px' />
      </Container>
    )
  }

  return (
    <>
      <CustomHead
        title="Penesan - Prove it Daeng!"
        description="Challenge yourself. Get to know the local culture of Makassar, and see the appreciation you will receive (of course it's just a joke)"
        url="https://debut.vercel.app"
      />
      <Container style={{ backgroundColor: 'white' }}>
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