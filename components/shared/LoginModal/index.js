import { getCsrfToken } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginWithSocialBtn from "../../LoginSignUp/LoginWithSocialBtn";
import TextInput from "../../LoginSignUp/TextInput";
import Wrapper from "../../LoginSignUp/Wrapper";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const LoginModal = ({show, onClose, loginTitle, loginDescription, signupTitle, signupDescription}) => {
    const [locationHref, setLocationHref] = useState('')

    const [isLoginModal, setIsLoginModal] = useState(true)

    useEffect(() => {
        setLocationHref(window.location.href)
    }, [])
    
    return (
        <div className={`w-screen h-screen overflow-y-auto pt-16 bg-black bg-opacity-80 flex items-center justify-center absolute left-0 top-0 ${!show && 'hidden'}`}>
            <Wrapper>
                <h1 className='text-xl font-bold text-center mb-2'>{isLoginModal ? loginTitle : signupTitle}</h1>
                <p className='text-center text-sm mb-8 text-text-secondary'>{isLoginModal ? loginDescription : signupDescription}</p>
                <div className='my-6 flex flex-col gap-4'>
                    <LoginWithSocialBtn label='Continue with Google' icon='google' provider='google' callbackUrl={locationHref} />
                    <LoginWithSocialBtn label='Continue with Facebook' icon='facebook' provider='facebook' callbackUrl={locationHref} />
                    <LoginWithSocialBtn label='Continue with Twitter' icon='twitter' provider='twitter' callbackUrl={locationHref} />
                </div>
                <p className='text-sm text-gray-400 text-center'>— or —</p>
                {isLoginModal ?
                    <LoginForm locationHref={locationHref} />
                    :
                    <SignUpForm setIsLoginModal={setIsLoginModal} />
                }
                <div className='text-center text-sm text-text-secondary'>
                    {isLoginModal ? `Don't have an account?` : `Already have an account?`}
                    <a className='font-medium text-cust-purple hover:underline ml-1 cursor-pointer' onClick={() => setIsLoginModal(prev => !prev)}>
                        {isLoginModal ? 'Sign up' : 'Login'}
                    </a>
                </div>
            </Wrapper>
        </div>
    );
}
 
export default LoginModal;