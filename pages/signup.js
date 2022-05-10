import Button from "../components/shared/Button"
import { signIn, signOut } from 'next-auth/client'
import CustomHead from "../components/shared/CustomHead";
import Container from "../components/LoginSignUp/Container";
import Wrapper from "../components/LoginSignUp/Wrapper";
import TextInput from "../components/LoginSignUp/TextInput";
import LoginWithSocialBtn from "../components/LoginSignUp/LoginWithSocialBtn";
import Link from "next/link";
import Logo from "../components/shared/Logo";
import { useEffect, useState } from "react";
import { signUp } from "next-auth-sanity/dist/client";
import router from "next/router";
import Message from "../components/shared/Message";
import Spinner from "../components/shared/Spinner";

const SignUpPage = () => {
    const initInput = {
        nameInput: '',
        email: '',
        password: '',
        confirmPassword: ''
    }


    const [origin, setOrigin] = useState('')

    const [input, setInput] = useState(initInput)
    const { nameInput, email, password, confirmPassword } = input
    const [isConfirmPasswordSame, setIsConfirmPasswordSame] = useState(false)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setIsConfirmPasswordSame(password == confirmPassword)
    }, [password, confirmPassword])

    const handleChange = e => {
        const { name, value } = e.target

        setInput(prev => ({
            ...prev,
            [name]: value
        }))

        setMessage(null)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!isConfirmPasswordSame) {
            setMessage({ type: 'error', text: 'Password and Confirmation Password is not same.' })
            return
        }

        setLoading(true)


        const res = await signUp({
            ...input,
            name: nameInput
        })

        console.log(res)

        if (res.error) {
            setMessage({ type: 'error', text: res.error })
            setLoading(false)
            return
        }

        if (res.email) {
            setMessage({ type: 'success', text: 'Successfully create an account, please login.' })
            const goToLogin = setInterval(() => {
                router.push('/login')
                clearInterval(goToLogin)
            }, 3000)
        }
    }

    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])

    return (
        <>
            <CustomHead
                title='Login - Penesan'
                description='Login to get information with fun'
                url='https://debut.vercel.app/login'
            />
            <Container>
                <Wrapper>
                    <h1 className='mb-2 text-xl font-bold text-center'>Welcome to DeBut</h1>
                    <p className='mb-6 text-sm text-center text-text-secondary'>Explore all fun information through the quiz and share your result.</p>
                    <div className='flex flex-col gap-4 my-6'>
                        <LoginWithSocialBtn label='Continue with Google' icon='google' provider='google' callbackUrl={`${origin}/explore`} />
                        <LoginWithSocialBtn label='Continue with Facebook' icon='facebook' provider='facebook' callbackUrl={`${origin}/explore`} />
                        <LoginWithSocialBtn label='Continue with Twitter' icon='twitter' provider='twitter' callbackUrl={`${origin}/explore`} />
                    </div>
                    <p className='text-sm text-center text-gray-400'>— or —</p>
                    <form className='flex flex-col gap-4 my-6' onSubmit={handleSubmit}>
                        <TextInput id='name' type='text' name='nameInput' label='Name' value={nameInput} onChange={handleChange} required />
                        <TextInput id='email' type='email' name='email' label='Email' placeholder='mail@example.com' value={email} onChange={handleChange} required />
                        <TextInput id='password' type='password' name='password' label='Password' value={password} onChange={handleChange} required
                            style={`${isConfirmPasswordSame ? 'border-green-400' : 'border-red-400'} ${!(password && confirmPassword) && 'border-gray-200 focus:border-cust-purple'}`}
                        />
                        <TextInput id='confirm-password' type='password' name='confirmPassword' label='Confirm Password' value={confirmPassword} onChange={handleChange} required
                            style={`${isConfirmPasswordSame ? 'border-green-400' : 'border-red-400'} ${!(password && confirmPassword) && 'border-gray-200 focus:border-cust-purple'}`}
                        />
                        <button type='submit' className={`w-full mt-2 bg-cust-purple text-white font-medium py-2 rounded flex items-center justify-center ${loading && 'cursor-not-allowed bg-opacity-90'}`}>
                            {loading ?
                                <Spinner width='24px' />
                                :
                                'Sign Up'
                            }
                        </button>
                    </form>
                    <div className='text-sm text-center text-text-secondary'>
                        Already have an account?
                        <Link href='/login'><a className='ml-1 font-medium text-cust-purple hover:underline'>Login</a></Link>
                    </div>
                </Wrapper>
                {message && <Message {...message} />}
            </Container>
        </>
    );
}

export default SignUpPage;