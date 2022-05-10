import { getCsrfToken, signIn } from 'next-auth/client'
import CustomHead from "../components/shared/CustomHead";
import Container from "../components/LoginSignUp/Container";
import Wrapper from "../components/LoginSignUp/Wrapper";
import TextInput from "../components/LoginSignUp/TextInput";
import LoginWithSocialBtn from "../components/LoginSignUp/LoginWithSocialBtn";
import Link from "next/link";
import { useEffect, useState } from "react";
import Message from '../components/shared/Message';
import { Router, useRouter } from 'next/dist/client/router';
import Spinner from '../components/shared/Spinner';
import useTranslations from '../hooks/useTranslations';
import LanguageSelector from '../components/shared/LanguageSelector';

const LoginPage = () => {
    const initInput = {
        email: '',
        password: ''
    }

    const text = useTranslations('loginPage')

    const errorQuery = useRouter().query.error
    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState(initInput)
    const { email, password } = input

    const [csrfToken, setCsrfToken] = useState('')
    const [origin, setOrigin] = useState('')

    const handleChange = e => {
        const { value, name } = e.target
        setError(null)

        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const getCsrfTokenFunc = async () => {
            const csrfToken = await getCsrfToken()
            setCsrfToken(csrfToken)
        }
        getCsrfTokenFunc()
    }, [])

    useEffect(() => {
        setError(errorQuery)
    }, [errorQuery])

    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])

    return (
        <>
            <CustomHead
                title='Login - Penesan'
                description='Login to get information with fun'
                url='https://www.xn--slfd.id/login'
            />
            <Container>
                <LanguageSelector className='absolute top-2 lg:top-8 lg:left-4' dark={true} />
                <Wrapper>
                    <h1 className='mb-6 text-xl font-bold text-center'>{text[0][0]}</h1>
                    <div className='flex flex-col gap-4 my-6'>
                        <LoginWithSocialBtn label={text[0][1]} icon='google' provider='google' callbackUrl={`${origin}/explore`} />
                        <LoginWithSocialBtn label={text[0][2]} icon='facebook' provider='facebook' callbackUrl={`${origin}/explore`} />
                        {/* <LoginWithSocialBtn label='Continue with Twitter' icon='twitter' provider='twitter' callbackUrl={`${origin}/explore`} /> */}
                    </div>
                    <p className='text-sm text-center text-gray-400'>{text[0][4]}</p>
                    <form className='flex flex-col gap-4 my-6' action={`${origin}/api/auth/callback/sanity-login`} method="POST" onSubmit={() => setLoading(true)}>
                        <input type="hidden" name="csrfToken" value={csrfToken} />
                        <TextInput id='email' type='email' name='email' label={text[0][5]} placeholder='mail@example.com' value={email} onChange={handleChange} required />
                        <TextInput id='password' type='password' name='password' label={text[0][6]} value={password} onChange={handleChange} required />
                        <button type='submit' className='w-full py-2 mt-2 font-medium text-white rounded bg-cust-purple'>
                            {loading ?
                                <Spinner width='24px' />
                                :
                                text[0][7]
                            }
                        </button>
                    </form>
                    <div className='text-sm text-center text-text-secondary'>
                        {text[0][8]}
                        <Link href='/signup'><a className='ml-1 font-medium text-cust-purple hover:underline'>{text[0][9]}</a></Link>
                    </div>
                </Wrapper>
            </Container>
            {error && <Message type='error' text={error} />}
        </>
    );
}

export default LoginPage;