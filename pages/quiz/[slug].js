import groq from "groq";
import Image from "next/image";
import client from "../../client";
import Container from "../../components/shared/Container";
import CustomHead from "../../components/shared/CustomHead"
import Section from "../../components/shared/Section";
import { urlFor } from "../../imageUrlBuilder";
import BlockContent from '@sanity/block-content-to-react'
import Button from "../../components/shared/Button";
import ShareModal from "../../components/shared/ShareModal";
import { useState } from "react";
import { useRouter } from "next/router";

const QuizSinglePage = ({quiz}) => {
    const router = useRouter()
    const [showShareModal, setShowShareModal] = useState(false)

    if (!quiz) {
        return <p>Loading...</p>
    }

    return (
        <>
            <CustomHead 
                title={quiz.title}
                description={quiz.description[0].children[0].text}
                image={urlFor(quiz.mainImage).url()}
                url={`https://debut.vercel.app/quiz/${quiz.slug.current}`}
            />
            <Container>
                <Section>
                    <div className='flex flex-col items-center justify-center lg:flex-row gap-8'>
                        <div className='relative w-96 max-w-full h-80 lg:h-96 rounded-3xl overflow-hidden flex-shrink-0 lg:mr-20 border-2 border-gray-800 shadow-quiz-card'>
                            <Image src={urlFor(quiz.mainImage).url()} alt={quiz.title + ' Image'} layout='fill' className='object-cover object-center' />
                        </div>
                        <div className='max-w-lg'>
                            <h1 className='text-2xl lg:text-4xl font-bold mb-4 leading-normal'>{quiz.title}</h1>
                            <BlockContent blocks={quiz.description} className='leading-normal text-text-secondary' renderContainerOnSingleChild={true} />
                            <div className='flex gap-4 mt-6 items-center'>
                                <Button variant='primary' onClick={() => router.push(`/quiz/${quiz.slug.current}/do`)}>
                                    <i className='icon-play mr-3' />
                                    Play Quiz
                                </Button>
                                <Button variant='secondary' onClick={() => setShowShareModal(true)}>
                                    <i className='icon-share mr-3' />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </Section>
            </Container>
            <ShareModal
                show={showShareModal}
                onCancel={() => setShowShareModal(false)}
                text={`Let's%20get%20COVID-19%20information%20with%20fun!`}
            />
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