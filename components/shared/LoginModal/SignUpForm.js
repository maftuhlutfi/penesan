import { useEffect, useState } from "react"
import { signUp } from "next-auth-sanity/dist/client"
import TextInput from "../../LoginSignUp/TextInput"
import Spinner from "../Spinner"
import Message from "../Message"

const SignUpForm = ({setIsLoginModal}) => {
    const initInput = {
        nameInput: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [input, setInput] = useState(initInput)
    const {nameInput, email, password, confirmPassword} = input
    const [isConfirmPasswordSame, setIsConfirmPasswordSame] = useState(false)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setIsConfirmPasswordSame(password == confirmPassword)
    }, [password, confirmPassword])

    const handleChange = e => {
        const {name, value} = e.target

        setInput(prev => ({
            ...prev,
            [name]: value
        }))

        setMessage(null)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!isConfirmPasswordSame) {
            setMessage({type: 'error', text: 'Password and Confirmation Password is not same.'})
            return
        }

        setLoading(true)


        const res = await signUp({
            ...input,
            name: nameInput
        })

        console.log(res)

        if (res.error) {
            setMessage({type: 'error', text: res.error})
            setLoading(false)
            return
        }

        if (res.email) {
            setMessage({type: 'success', text: 'Successfully create an account, please login.'})
            const goToLogin = setInterval(() => {
                setIsLoginModal(true)
                clearInterval(goToLogin)
            }, 3000)
        }
    }

    return (
        <>
            <form className='my-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                <TextInput id='name' type='text' name='nameInput' label='Name' value={nameInput} onChange={handleChange} required />
                <TextInput id='email' type='email' name='email' label='Email' placeholder='mail@example.com' value={email} onChange={handleChange} required />
                <TextInput id='password' type='password' name='password' label='Password' value={password} onChange={handleChange} required 
                    style={`${isConfirmPasswordSame ? 'border-green-400': 'border-red-400'} ${!(password && confirmPassword) && 'border-gray-200 focus:border-cust-purple'}`} 
                />
                <TextInput id='confirm-password' type='password' name='confirmPassword' label='Confirm Password' value={confirmPassword} onChange={handleChange} required 
                    style={`${isConfirmPasswordSame ? 'border-green-400': 'border-red-400'} ${!(password && confirmPassword) && 'border-gray-200 focus:border-cust-purple'}`} 
                />
                <button type='submit' className={`w-full mt-2 bg-cust-purple text-white font-medium py-2 rounded flex items-center justify-center ${loading && 'cursor-not-allowed bg-opacity-90'}`}>
                    {loading ?
                        <Spinner width='24px' />
                        : 
                        'Sign Up'
                    }
                </button>
            </form>
            {message && <Message {...message} />}
        </>
);
}
 
export default SignUpForm;