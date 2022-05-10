import groq from "groq";
import client from "../../../client";
import PauseMenu from "../../../components/DoTheQuiz/PauseMenu";
import Container from "../../../components/DoTheQuiz/Container";
import CustomHead from "../../../components/shared/CustomHead"
import { urlFor } from "../../../imageUrlBuilder";
import QuestionNumber from "../../../components/DoTheQuiz/QuestionNumber";
import FullscreenBtn from "../../../components/DoTheQuiz/FullscreenBtn";
import { useContext, useEffect, useState } from "react";
import Button from "../../../components/shared/Button";
import Explaination from "../../../components/DoTheQuiz/Explaination";
import AnswersContainer from "../../../components/DoTheQuiz/AnswersContainer";
import Question from "../../../components/DoTheQuiz/Question";
import Message from "../../../components/DoTheQuiz/Message";
import AnswerBtn from "../../../components/DoTheQuiz/AnswerBtn";
import { useRouter } from "next/dist/client/router";
import createResultId from "../../../components/DoTheQuiz/createResultId";

import { useSession } from "next-auth/client";
import LoginModal from "../../../components/shared/LoginModal";
import { LanguageContext, TempDataContext } from "../../../components/Context";
import Spinner from "../../../components/shared/Spinner";
import LanguageSelector from "../../../components/shared/LanguageSelector";

const DoTheQuizPage = ({ quiz }) => {
    const router = useRouter()
    const [session, sessionLoading] = useSession()

    const { lang } = useContext(LanguageContext)

    const { score, addTempData, removeTempData } = useContext(TempDataContext)
    const [showLoginModal, setShowLoginModal] = useState(false)

    const [question, setQuestion] = useState(null)
    const [questionNumber, setQuestionNumber] = useState(0)
    const [answerFromUser, setAnswerFromUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [totalCorrect, setTotalCorrect] = useState(0)

    const [loading, setLoading] = useState(false)

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

            if (answer == question.correctAnswer) {
                setTotalCorrect(prev => prev + 1)
            }
        }
    }

    const handleRetry = () => {
        setQuestionNumber(0)
        setMessage(null)
        setAnswerFromUser(null)
        setTotalCorrect(0)
    }

    const createResult = async (score) => {
        setLoading(true)

        const userRes = await client.fetch(groq`
            *[_type == "user" && email == "${session.user.email}"][0] {
                _id
            }
        `)
        const userId = await userRes._id
        const doc = await {
            _type: 'result',
            quiz: {
                _ref: quiz._id
            },
            user: {
                _ref: userId
            },
            score
        }

        try {
            const createRes = await client.create(doc)
            if (createRes) {
                router.push(`/result/${createRes._id}`)
                window.localStorage.removeItem('tempData')
                removeTempData('score')
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const handleNextFinish = () => {
        const score = totalCorrect / quiz.totalQuestions * 100

        if (questionNumber + 1 < quiz.totalQuestions) {
            setQuestionNumber(prev => prev + 1)
        } else if (!session) {
            addTempData('score', score)
            setShowLoginModal(true)
            return
        } else {
            createResult(score)
        }
    }

    useEffect(() => {
        if (score && session) {
            createResult(score)
        }
    }, [score, session])

    if (router.isFallback || !quiz) {
        return (
            <Container>
                <Spinner purple width='30px' />
            </Container>
        )
    }

    console.log(question.explaination.map(t => t.children.map(c => c.text).join(". ")).join("\n").split(" || "))

    return (
        <>
            <CustomHead
                title={quiz.title}
                description={quiz.description[0].children[0].text}
                image={urlFor(quiz.mainImage).url()}
                url={`https://www.xn--slfd.id/quiz/${quiz.slug.current}/do`}
            />
            <Container>
                <div className='fixed left-0 z-30 flex justify-between w-full px-8 pb-4 lg:px-0 bg-text-primary lg:static'>
                    <div className='flex gap-4 text-xs md:text-base'>
                        <PauseMenu totalCorrect={totalCorrect} retryQuiz={handleRetry} />
                        <QuestionNumber totalQuestions={quiz.totalQuestions} current={questionNumber + 1} />
                        <LanguageSelector dark={true} />
                    </div>
                    <div className='flex gap-6'>
                        {answerFromUser &&
                            <div className={`bg-white w-full fixed bottom-0 left-0 pt-4 pb-6 flex justify-end px-4 lg:static lg:bg-transparent lg:p-0`}>
                                <Button variant='secondary' onClick={handleNextFinish}>
                                    {questionNumber + 1 < quiz.totalQuestions ? 'Next' : 'Finish'}
                                </Button>
                            </div>
                        }
                        <FullscreenBtn />
                    </div>
                </div>
                <section className='relative w-full max-w-4xl pt-24 pb-24 m-auto lg:pb-8 lg:pt-20 lg:px-20'>
                    {question ?
                        <>
                            <Question text={lang == 'indo' ? question.question.split(' || ')[0] : question.question.split(' || ')[1]} />
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
                                        {lang == 'indo' ? answer.split(' || ')[0] : answer.split(' || ')[1]}
                                    </AnswerBtn>
                                )}
                            </AnswersContainer>
                            {answerFromUser && <Explaination text={lang == 'indo' ? question.explaination.map(t => t.children.map(c => c.text).join(". ")).join("\n").split(" || ")[0] : question.explaination.map(t => t.children.map(c => c.text).join(". ")).join("\n").split(" || ")[1]} />}
                        </>
                        :
                        <Spinner width='30px' />
                    }
                </section>
                {message && <Message {...message} />}
            </Container>
            <LoginModal
                loginTitle='Oops, Login First'
                loginDescription='You have to login first to see your result.'
                signupTitle='Sign Up'
                signupDescription='Sign up and the login.'
                show={showLoginModal}
            />
            {loading && <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black cursor-not-allowed bg-opacity-80'><Spinner width='30px' /></div>}
        </>
    );
}

export default DoTheQuizPage;

const quizSlugQuery = groq`
    *[_type == "quiz" && defined(slug.current)][].slug.current
`

const quizQuery = groq`
    *[_type == "quiz" && slug.current == $slug][0] {
        _id,
        title,
        'totalQuestions': count(questions),
        description,
        mainImage,
        slug
    }
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