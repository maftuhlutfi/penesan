import { getCsrfToken } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginWithSocialBtn from "../LoginSignUp/LoginWithSocialBtn";
import TextInput from "../LoginSignUp/TextInput";
import Wrapper from "../LoginSignUp/Wrapper";
import Spinner from "./Spinner";

const LoginModal = ({show, onClose, title, description}) => {
    const initInput = {
        email: '',
        password: ''
    }

    const errorQuery = useRouter().query.error
    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState(initInput)
    const {email, password} = input

    const [csrfToken, setCsrfToken] = useState('')
    const [locationHref, setLocationHref] = useState('')

    const handleChange = e => {
        const {value, name} = e.target
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
        setLocationHref(window.location.href)
    }, [])

    useEffect(() => {
        setError(errorQuery)
    }, [errorQuery])
    
    return (
        <div className={`w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center absolute left-0 top-0 ${!show && 'hidden'}`}>
            <Wrapper>
                <h1 className='text-xl font-bold text-center mb-2'>{title}</h1>
                <p className='text-center text-sm mb-8 text-text-secondary'>{description}</p>
                <div className='my-6 flex flex-col gap-4'>
                    <LoginWithSocialBtn label='Continue with Google' icon='google' provider='google' callbackUrl={locationHref} />
                    <LoginWithSocialBtn label='Continue with Facebook' icon='facebook' provider='facebook' callbackUrl={locationHref} />
                    <LoginWithSocialBtn label='Continue with Twitter' icon='twitter' provider='twitter' callbackUrl={locationHref} />
                </div>
                <p className='text-sm text-gray-400 text-center'>— or —</p>
                <form className='my-6 flex flex-col gap-4' action='http://localhost:3000/api/auth/callback/sanity-login' method="POST" onSubmit={() => setLoading(true)}>
                    <input type="hidden" name="csrfToken" value={csrfToken} />
                    <TextInput id='email' type='email' name='email' label='Email' placeholder='mail@example.com' value={email} onChange={handleChange} required />
                    <TextInput id='password' type='password' name='password' label='Password' value={password} onChange={handleChange} required />
                    <button type='submit' className='w-full mt-2 bg-cust-purple text-white font-medium py-2 rounded'>
                        {loading ?
                            <Spinner width='24px' />
                            :
                            'Login'
                        }
                    </button>
                </form>
                <div className='text-center text-sm text-text-secondary'>
                    Don't have an account?
                    <Link href='/signup'><a className='font-medium text-cust-purple hover:underline ml-1'>Sign up</a></Link>
                </div>
            </Wrapper>
        </div>
    );
}
 
export default LoginModal;