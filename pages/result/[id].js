import groq from "groq";
import { useRouter } from "next/dist/client/router";
import client from "../../client";
import Container from "../../components/shared/Container";
import Image from 'next/image'
import { urlFor } from "../../imageUrlBuilder";
import Button from "../../components/shared/Button";

const ResultPage = ({result, score}) => {
    const router = useRouter()

    if (router.isFallback) {
        return <Container>
            <p>Loading...</p>
        </Container>
    }
    console.log(result.title)

    return (
        <>
            <Container>
                <div className='text-center w-full max-w-screen-md relative mx-auto leading-normal px-8 flex flex-col items-center'>
                    <h1 className='font-bold text-2xl lg:text-3xl mb-2 lg:mb-4'>You've Completed the Quiz</h1>
                    <p className='text-text-secondary'>Your score is <b>{score.toFixed(0)}</b> & here is your result:</p>
                    <div className='w-64 h-56  relative rounded-xl overflow-hidden my-8'>
                        <Image src={urlFor(result.image).url()} layout='fill' className='object-cover object-center' />
                    </div>
                    <p className='italic font-semibold bg-white p-4 rounded-xl border-2 border-gray-700 shadow-quiz-card md:mb-4'>" {result.title.replace(/{name}/g, 'Enggar')} "</p>
                    <div className='flex gap-4 mt-6 items-center fixed bottom-0 bg-white justify-center z-10 w-full left-0 pt-4 pb-8 md:static md:bg-transparent md:p-0'>
                        <Button variant='primary'>
                            <i className='icon-rotate mr-3' />
                            Play Again
                        </Button>
                        <Button variant='secondary'>
                            <i className='icon-share mr-3' />
                            Share
                        </Button>
                    </div>
                </div>
            </Container>
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
            scoring
        }
    }
`

export async function getStaticProps({params}) {
    const res = await client.fetch(resultQuery, {
        id: params.id
    })
    const scoring = await res.quiz.scoring.sort((a, b) => a.min <= b.min ? 1 : -1)
    const score = await res.score

    return {
        props: {
            result: scoring.filter(s => s.min <= score)[0],
            score
        },
    }
}

export async function getStaticPaths() {
    const resultsId = await client.fetch(resultIdQuery)

    return {
        paths: resultsId.map(id => ({params: {id}})),
        fallback: true
    }
}