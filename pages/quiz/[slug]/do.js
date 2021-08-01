import groq from "groq";
import client from "../../../client";
import Container from "../../../components/shared/Container";
import CustomHead from "../../../components/shared/CustomHead"
import Section from "../../../components/shared/Section";
import { urlFor } from "../../../imageUrlBuilder";

const DoTheQuizPage = ({quiz}) => {
    if (!quiz) {
        return <p>Loading...</p>
    }

    return (
        <>
            <CustomHead 
                title={quiz.title}
                description={quiz.description[0].children[0].text}
                image={urlFor(quiz.mainImage).url()}
                url={`https://debut.vercel.app/quiz/${quiz.slug.current}/do`}
            />
            <Container>
                <Section>
                    sda
                </Section>
            </Container>
        </>
    );
}
 
export default DoTheQuizPage;

const quizSlugQuery = groq`
    *[_type == "quiz" && defined(slug.current)][].slug.current
`

const quizQuery = groq`
    *[_type == "quiz" && slug.current == $slug][0] {
        title,
        'totalQuestions': count(questions),
        description,
        mainImage,
        slug
    }
`

export async function getStaticProps({params}) {
    const quiz = await client.fetch(quizQuery, {
        slug: params.slug
    })

    return {
        props: {
            quiz
        },
    }
}

export async function getStaticPaths() {
    const paths = await client.fetch(quizSlugQuery)

    return {
        paths: paths.map(slug => ({params: {slug}})),
        fallback: true
    }
}