import groq from "groq";
import client from "../../../client";
import PauseMenu from "../../../components/DoTheQuiz/PauseMenu";
import Container from "../../../components/DoTheQuiz/Container";
import CustomHead from "../../../components/shared/CustomHead"
import { urlFor } from "../../../imageUrlBuilder";
import QuestionNumber from "../../../components/DoTheQuiz/QuestionNumber";
import FullscreenBtn from "../../../components/DoTheQuiz/FullscreenBtn";
import { useEffect, useState } from "react";
import Button from "../../../components/shared/Button";
import Explaination from "../../../components/DoTheQuiz/Explaination";
import AnswersContainer from "../../../components/DoTheQuiz/AnswersContainer";
import Question from "../../../components/DoTheQuiz/Question";
import Message from "../../../components/DoTheQuiz/Message";
import AnswerBtn from "../../../components/DoTheQuiz/AnswerBtn";

const DoTheQuizPage = ({quiz}) => {
    const [question, setQuestion] = useState(null)
    const [questionNumber, setQuestionNumber] = useState(0)
    const [answerFromUser, setAnswerFromUser] = useState(null)
    const [message, setMessage] = useState(null)
    
    const isCorrect = question && question.correctAnswer == answerFromUser

    useEffect(() => {
        if (quiz) {
            const getQuestion = async () => {
                const res = await client.fetch(groq`
                    *[_type == "quiz" && slug.current == "${quiz.slug.current}"][0] {
                        'question': questions[${questionNumber}]
                    }
                `)
                setQuestion(res.question)
            }
            getQuestion()
        }
        setMessage(null)
        setAnswerFromUser(null)
    }, [questionNumber])

    const handleUserClickAnswer = answer => {
        if (!answerFromUser) {
            setAnswerFromUser(answer)
            setMessage({
                type: question && answer == question.correctAnswer ? 'correct' : 'wrong',
                message: question && answer == question.correctAnswer ? 'Your answer is correct ✓' : 'Your answer is wrong ✖'
            })
        }
    }

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
                <div className='flex fixed w-full left-0 px-8 pb-4 bg-text-primary lg:static z-30 justify-between'>
                    <div className='flex gap-4 text-xs md:text-base'>
                        <PauseMenu />
                        <QuestionNumber totalQuestions={quiz.totalQuestions} current={questionNumber+1} />
                    </div>
                    <div className='flex gap-6'>
                        {answerFromUser && 
                            <div className={`bg-white w-full fixed bottom-0 left-0 pt-4 pb-6 flex justify-end px-4 lg:static lg:bg-transparent lg:p-0`}>
                                <Button variant='secondary' onClick={() => setQuestionNumber(prev => prev+1)}>
                                    {questionNumber + 1 < quiz.totalQuestions ? 'Next' : 'Finish'}
                                </Button>
                            </div>
                        }
                        <FullscreenBtn />
                    </div>
                </div>
                <section className='pt-24 pb-24 lg:pb-8 lg:pt-20 w-full max-w-4xl lg:px-20 relative m-auto'>
                    {question ? 
                        <>
                            <Question text={question.question} />
                            <AnswersContainer>
                                {question.answers.map((answer, index) => 
                                    <AnswerBtn 
                                        key={index}
                                        onClick={() => handleUserClickAnswer(answer)}
                                        selected={answerFromUser == answer}
                                        isUserAnswered={answerFromUser}
                                        isCorrectAnswer={question.correctAnswer == answer}
                                        style={`${answerFromUser && answerFromUser != answer && 'bg-transparent border-2 border-white'} 
                                            ${answerFromUser && 'shadow-none'} 
                                            ${answerFromUser && question.correctAnswer == answer && 'bg-green-500 border-none'}
                                        `}
                                    >
                                        {answer}
                                    </AnswerBtn>
                                )}
                            </AnswersContainer>
                            {answerFromUser && <Explaination text={question.explaination} />}
                        </>
                        :
                        <p>Loading...</p>
                    }
                </section>
                {message && <Message {...message} />}
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