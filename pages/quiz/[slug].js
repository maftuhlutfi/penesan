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
import Spinner from "../../components/shared/Spinner";
import { useContext } from "react";
import { LanguageContext } from "../../components/Context";


const QuizSinglePage = ({ quiz }) => {
    const isIndo = useContext(LanguageContext).lang == 'indo'
    const router = useRouter()
    const [showShareModal, setShowShareModal] = useState(false)

    if (router.isFallback || !quiz) {
        return (
            <Container>
                <Spinner purple width='30px' />
            </Container>
        )
    }

    return (
        <>
            <CustomHead
                title={quiz.title}
                description={quiz.description[0].children[0].text}
                image={urlFor(quiz.mainImage).url()}
                url={`https://www.xn--slfd.id/quiz/${quiz.slug.current}`}
            />
            <Container>
                <Section>
                    <div className='flex flex-col items-center justify-center gap-8 lg:flex-row'>
                        <div className='relative flex-shrink-0 max-w-full overflow-hidden border-2 border-gray-800 w-96 h-80 lg:h-96 rounded-3xl lg:mr-20 shadow-quiz-card'>
                            <Image src={urlFor(quiz.mainImage).url()} alt={quiz.title + ' Image'} layout='fill' className='object-cover object-center' />
                        </div>
                        <div className='max-w-lg'>
                            <h1 className='mb-4 text-2xl font-bold leading-normal lg:text-4xl'>
                                {isIndo ? quiz.title.split(" || ")[0] : quiz.title.split(" || ")[1]}
                            </h1>
                            <p className='leading-normal text-text-secondary'>
                                {isIndo ? quiz.description.map(t => t.children.map(c => c.text).join(". ")).join("\n").split(" || ")[0] : quiz.description.map(t => t.children.map(c => c.text).join(". ")).join("\n").split(" || ")[1]}
                            </p>
                            <div className='fixed bottom-0 left-0 z-10 flex items-center justify-center w-full gap-4 pt-4 pb-8 mt-6 bg-white md:static md:bg-transparent md:justify-start md:p-0'>
                                <Button variant='primary' onClick={() => router.push(`/quiz/${quiz.slug.current}/do`)}>
                                    <i className='mr-3 icon-play' />
                                    {isIndo ? 'Bermain' : ' ᨅᨛᨑᨛᨆᨕᨗᨊᨛ'}
                                </Button>
                                <Button variant='secondary' onClick={() => setShowShareModal(true)}>
                                    <i className='mr-3 icon-share' />
                                    {isIndo ? 'Bagikan' : 'ᨅᨁᨗᨀᨊᨛ'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Section>
                <Section>
                    <button className='px-6 py-3 text-lg font-semibold bg-white shadow-sm rounded-xl' onClick={() => router.back()}>
                        <i className='mr-3 text-base icon-arrow-left text-light-purple' />
                        {isIndo ? 'Kembali' : 'ᨀᨛᨆᨛᨅᨒᨗ'}
                    </button>
                </Section>
            </Container>
            <ShareModal
                show={showShareModal}
                onCancel={() => setShowShareModal(false)}
                text={`Yuk%20belajar%20budaya%20bugis%20dengan%20menyenangkan!`}
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

export async function getStaticProps({ params }) {
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
        paths: paths.map(slug => ({ params: { slug } })),
        fallback: true
    }
}