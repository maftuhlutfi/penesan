import groq from 'groq';
import Image from 'next/image'
import { useSession } from "next-auth/client";
import { useContext, useEffect, useState } from 'react';
import client from '../../client'
import Button from '../shared/Button';
import { useRouter } from 'next/router';
import LoginModal from '../shared/LoginModal';
import { TempDataContext } from '../Context';
import Spinner from '../shared/Spinner';
import useTranslations from '../../hooks/useTranslations';

const ContributeForm = () => {
    const [session, sessionLoading] = useSession()
    const router = useRouter()

    const text = useTranslations('contributePage')

    const { contributionData, addTempData, removeTempData } = useContext(TempDataContext)

    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = useState([])
    const [input, setInput] = useState({
        title: '',
        category: '',
        description: ''
    })
    const { title, category, description } = input

    const [showLoginModal, setShowLoginModal] = useState(false)

    useEffect(() => {
        const getCategory = async () => {
            const res = await client.fetch(groq`
                *[_type == "category"] {
                    _id,
                    title
                }
            `)
            setCategories(res)
            setInput(prev => ({
                ...prev,
                category: res[0]._id
            }))
        }
        getCategory()
    }, [])

    const handleChange = e => {
        const { value, name } = e.target

        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const createContribution = async data => {
        setLoading(true)
        const userRes = await client.fetch(groq`
            *[_type == "user" && email == "${session.user.email}"][0] {
                _id
            }
        `)

        const userId = await userRes._id

        const doc = {
            _type: 'contribution',
            category: {
                _ref: data.category
            },
            user: {
                _ref: userId
            },
            title: data.title,
            description: data.description
        }

        try {
            const createRes = await client.create(doc)
            if (createRes) {
                router.reload()
                window.localStorage.removeItem('tempData')
                removeTempData('contributionData')
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!session) {
            setShowLoginModal(true)
            addTempData('contributionData', input)
            return
        }

        createContribution(input)
    }

    useEffect(() => {
        if (contributionData && session) {
            createContribution(contributionData)
        }
    }, [contributionData, session])

    return (
        <>
            <div className='flex flex-col items-center w-full overflow-hidden bg-white border-2 border-gray-700 shadow-quiz-card rounded-3xl lg:flex-row lg:py-16 lg:px-8'>
                <div className='relative w-full h-80 md:h-80 lg:hidden'>
                    <Image src='/landing/contribute-img.jpg' layout='fill' className='object-center object-fit' alt='contribute image' />
                </div>
                <div className='relative flex-shrink-0 hidden w-1/2 rounded-3xl lg:block' style={{ height: 500 }}>
                    <Image src='/landing/contribute-img.jpg' layout='fill' className='object-contain' alt='contribute image' />
                </div>
                <form id='contribute-form' className='w-full px-8 my-8 lg:my-0' onSubmit={handleSubmit}>
                    <p className='mb-1 font-semibold tracking-widest text-cust-purple lg:mb-2 lg:text-lg'>{text[0][0]}</p>
                    <h1 className='text-2xl font-semibold lg:text-3xl'>{text[0][1]}</h1>
                    <div className='flex flex-col gap-4 my-6 lg:my-8 lg:gap-6'>
                        <input type='text' className='w-full px-4 py-2 border rounded-lg outline-none bg-more-light-purple bg-opacity-60 focus:border-cust-purple' name='title' value={title} onChange={handleChange} placeholder='Title' autoComplete='off' required />
                        <select type='text' className='w-full px-4 py-2 border rounded-lg outline-none bg-more-light-purple bg-opacity-60 focus:border-cust-purple' name='category' value={category} onChange={handleChange} required>
                            {categories.map((category, index) =>
                                <option key={category._id} value={category._id}>{category.title}</option>
                            )}
                        </select>
                        <textarea className='w-full px-4 py-2 border rounded-lg outline-none bg-more-light-purple bg-opacity-60 focus:border-cust-purple' name='description' value={description} onChange={handleChange} rows='6' placeholder='Describe more' required />
                    </div>
                    <Button variant='primary' type='submit' form='contribute-form'>
                        Submit
                    </Button>
                </form>
            </div>
            <LoginModal
                show={showLoginModal}
                loginTitle='Oops, Login First'
                loginDescription='Please login to continue the contribution'
                signupTitle='Sign Up'
                signupDescription='Create account and start contributing'
            />
            {loading && <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black cursor-not-allowed bg-opacity-80'><Spinner width='30px' /></div>}
        </>
    );
}

export default ContributeForm;