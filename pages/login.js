import Button from "../components/shared/Button"
import {signIn, signOut} from 'next-auth/client'
import CustomHead from "../components/shared/CustomHead";
import Container from "../components/LoginSignUp/Container";
import Wrapper from "../components/LoginSignUp/Wrapper";
import TextInput from "../components/LoginSignUp/TextInput";
import LoginWithSocialBtn from "../components/LoginSignUp/LoginWithSocialBtn";
import Link from "next/link";

const LoginPage = () => {
    return (
        <>
            <CustomHead
                title='Login - DeBut'
                description='Login to get information with fun'
                url='https://debut.vercel.app/login'
            />
            <Container>
                <Wrapper>
                    <h1 className='text-xl font-bold text-center mb-6'>Login to DeBut</h1>
                    <div className='my-6 flex flex-col gap-4'>
                        <LoginWithSocialBtn label='Continue with Google' icon='google' provider='google' />
                        <LoginWithSocialBtn label='Continue with Facebook' icon='facebook' provider='facebook' />
                        <LoginWithSocialBtn label='Continue with Twitter' icon='twitter' provider='twitter' />
                    </div>
                    <p className='text-sm text-gray-400 text-center'>— or —</p>
                    <form className='my-6 flex flex-col gap-4'>
                        <TextInput id='email' type='email' name='email' label='Email' placeholder='mail@example.com' />
                        <TextInput id='password' type='password' name='password' label='Password' />
                        <button type='submit' className='w-full mt-2 bg-cust-purple text-white font-medium py-2 rounded'>Login</button>
                    </form>
                    <div className='text-center text-sm text-text-secondary'>
                        Don't have an account?
                        <Link href='/signup'><a className='font-medium text-cust-purple hover:underline ml-1'>Sign up</a></Link>
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}
 
export default LoginPage;