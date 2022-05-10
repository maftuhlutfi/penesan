import groq from "groq";
import { useRouter } from "next/dist/client/router";
import client from "../../client";
import Container from "../../components/shared/Container";
import Image from 'next/image'
import { urlFor } from "../../imageUrlBuilder";
import Button from "../../components/shared/Button";
import CustomHead from "../../components/shared/CustomHead";
import { useState } from "react";
import ShareModal from "../../components/shared/ShareModal";
import Spinner from "../../components/shared/Spinner";

const ResultPage = ({ result, score, user, quiz }) => {
    const router = useRouter()

    const [showShareModal, setShowShareModal] = useState(false)

    if (router.isFallback) {
        return (
            <Container>
                <Spinner purple width='30px' />
            </Container>
        )
    }

    return (
        <>
            <CustomHead
                title={`${user.name}'s Result - Quiz ${quiz.title}`}
                description={`${user.name}'s score is ${score}. ${result.title.replace(/{name}/g, user.name || 'You')}`}
                url={`https://www.xn--slfd.id/quiz/${quiz.slug.current}`}
                image={urlFor(result.image).url()}
            />
            <Container style={{ paddingBottom: '5rem' }}>
                <div className='relative flex flex-col items-center w-full max-w-screen-md px-8 mx-auto leading-normal text-center'>
                    <h1 className='mb-2 text-2xl font-bold lg:text-3xl lg:mb-4'>You've Completed the Quiz</h1>
                    <p className='text-text-secondary'>{user.name + "'s" || 'Your'} score is <b>{score}</b> & here is your result:</p>
                    <div className='relative w-64 h-56 my-8 overflow-hidden rounded-xl'>
                        <Image src={urlFor(result.image).url()} layout='fill' className='object-cover object-center' />
                    </div>
                    <p className='p-4 italic font-semibold bg-white border-2 border-gray-700 rounded-xl shadow-quiz-card md:mb-4'>" {result.title.replace(/{name}/g, user.name || 'You')} "</p>
                    <div className='fixed bottom-0 left-0 z-10 flex items-center justify-center w-full gap-4 pt-4 pb-8 mt-6 bg-white md:static md:bg-transparent md:p-0'>
                        <Button variant='primary' onClick={() => router.push(`/quiz/${quiz.slug.current}/do`)}>
                            <i className='mr-3 icon-rotate' />
                            Play Again
                        </Button>
                        <Button variant='secondary' onClick={() => setShowShareModal(true)}>
                            <i className='mr-3 icon-share' />
                            Share
                        </Button>
                    </div>
                </div>
            </Container>
            <ShareModal
                show={showShareModal}
                onCancel={() => setShowShareModal(false)}
                text={`${user.name}'s score is ${score}. ${result.title.replace(/{name}/g, user.name || 'You')}`}
            />
        </>
    );
}

export default ResultPage

const resultIdQuery = groq`
    *[_type == "result"][]._id
`

const resultQuery = groq`
    *[_type == "result" && _id == $id][0] {
        score,
        quiz->{
            title,
            scoring,
            slug
        },
        user->{
            name
        }
    }
`

export async function getStaticProps({ params }) {
    const res = await client.fetch(resultQuery, {
        id: params.id
    })
    const scoring = await res.quiz.scoring.sort((a, b) => a.min <= b.min ? 1 : -1)
    const score = await res.score.toFixed(0)
    const user = await res.user
    const quiz = await res.quiz

    return {
        props: {
            result: scoring.filter(s => s.min <= score)[0],
            score,
            user,
            quiz
        },
    }
}

export async function getStaticPaths() {
    const resultsId = await client.fetch(resultIdQuery)

    return {
        paths: resultsId.map(id => ({ params: { id } })),
        fallback: true
    }
}