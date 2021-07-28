import groq from "groq";
import Image from "next/image";
import client from "../../client";
import Container from "../../components/shared/Container";
import CustomHead from "../../components/shared/CustomHead"
import Section from "../../components/shared/Section";
import { urlFor } from "../../imageUrlBuilder";
import BlockContent from '@sanity/block-content-to-react'
import Button from "../../components/shared/Button";

const QuizSinglePage = ({quiz}) => {

    if (!quiz) {
        return <p>Loading...</p>
    }

    return (
        <>
            <CustomHead 
                title={quiz.title}
                description={quiz.description[0].children[0].text}
                image={urlFor(quiz.mainImage).url()}
                url="https://debut.vercel.app/explore"
            />
            <Container>
                <Section>
                    <div className='flex flex-col items-center justify-center lg:flex-row gap-8'>
                        <div className='relative w-96 max-w-full h-80 lg:h-96 rounded-3xl overflow-hidden flex-shrink-0 lg:mr-20'>
                            <Image src={urlFor(quiz.mainImage).url()} alt={quiz.title + ' Image'} layout='fill' className='object-cover object-center' />
                        </div>
                        <div className='max-w-lg'>
                            <h1 className='text-2xl lg:text-4xl font-bold mb-4 leading-normal'>{quiz.title}</h1>
                            <BlockContent blocks={quiz.description} className='leading-normal text-text-secondary' renderContainerOnSingleChild={true} />
                            <Button variant='primary' style='mt-6'>
                                <i className='icon-play mr-2' />
                                Play Quiz
                            </Button>
                        </div>
                    </div>
                </Section>
            </Container>
        </>
    )
}
 
export default QuizSinglePage;

const quizSlugQuery = groq`
    *[_type == "quiz" && defined(slug.current)][].slug.current
`

const quizQuery = groq`
    *[_type == "quiz" && slug.current == $slug][0]
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