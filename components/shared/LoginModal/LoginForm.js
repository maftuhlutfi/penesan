import { getCsrfToken } from "next-auth/client"
import { useEffect, useState } from "react"
import TextInput from "../../LoginSignUp/TextInput"
import Spinner from "../Spinner"

const LoginForm = ({locationHref}) => {
    const initInput = {
        email: '',
        password: ''
    }
    const [input, setInput] = useState(initInput)
    const {email, password} = input
    const [loading, setLoading] = useState(false)
    const [origin, setOrigin] = useState('')

    const [csrfToken, setCsrfToken] = useState('')

    const handleChange = e => {
        const {value, name} = e.target

        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const getCsrfTokenFunc = async () => {
            const csrfTokenRes = await getCsrfToken()
            setCsrfToken(csrfTokenRes)
        }
        getCsrfTokenFunc()
    }, [])

    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])

    return (
        <form className='my-6 flex flex-col gap-4' action={`${origin}/api/auth/callback/sanity-login?callbackUrl=${locationHref}`} method="POST" onSubmit={() => setLoading(true)}>
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
);
}
 
export default LoginForm;