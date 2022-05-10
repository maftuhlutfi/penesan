import { getCsrfToken } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginWithSocialBtn from "../../LoginSignUp/LoginWithSocialBtn";
import TextInput from "../../LoginSignUp/TextInput";
import Wrapper from "../../LoginSignUp/Wrapper";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const LoginModal = ({ show, onClose, loginTitle, loginDescription, signupTitle, signupDescription }) => {
    const [locationHref, setLocationHref] = useState('')

    const [isLoginModal, setIsLoginModal] = useState(true)

    useEffect(() => {
        setLocationHref(window.location.href)
    }, [])

    return (
        <div className={`w-screen h-screen overflow-y-auto pt-12 bg-black bg-opacity-80 flex items-center justify-center fixed z-50 left-0 top-0 ${!show && 'hidden'}`}>
            <Wrapper>
                <h1 className='mb-2 text-xl font-bold text-center'>{isLoginModal ? loginTitle : signupTitle}</h1>
                <p className='mb-8 text-sm text-center text-text-secondary'>{isLoginModal ? loginDescription : signupDescription}</p>
                <div className='flex flex-col gap-4 my-6'>
                    <LoginWithSocialBtn label='Continue with Google' icon='google' provider='google' callbackUrl={locationHref} />
                    <LoginWithSocialBtn label='Continue with Facebook' icon='facebook' provider='facebook' callbackUrl={locationHref} />
                    <LoginWithSocialBtn label='Continue with Twitter' icon='twitter' provider='twitter' callbackUrl={locationHref} />
                </div>
                <p className='text-sm text-center text-gray-400'>— or —</p>
                {isLoginModal ?
                    <LoginForm locationHref={locationHref} />
                    :
                    <SignUpForm setIsLoginModal={setIsLoginModal} />
                }
                <div className='text-sm text-center text-text-secondary'>
                    {isLoginModal ? `Don't have an account?` : `Already have an account?`}
                    <a className='ml-1 font-medium cursor-pointer text-cust-purple hover:underline' onClick={() => setIsLoginModal(prev => !prev)}>
                        {isLoginModal ? 'Sign up' : 'Login'}
                    </a>
                </div>
            </Wrapper>
        </div>
    );
}

export default LoginModal;