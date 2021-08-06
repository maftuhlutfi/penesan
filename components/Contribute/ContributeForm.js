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

const ContributeForm = () => {
    const [session, sessionLoading] = useSession()
    const router = useRouter()

    const {contributionData, addTempData, removeTempData} = useContext(TempDataContext)

    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = useState([])
    const [input, setInput] = useState({
        title: '',
        category: '',
        description: ''
    })
    const {title, category, description} = input

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
        const {value, name} = e.target

        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const createContribution = async data => {
        setLoading(true)
        const userRes = await client.fetch(groq`
            *[_type == "user" && email == "${session.user.email}" || name == "${session.user.name}"][0] {
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
        if(contributionData && session) {
            createContribution(contributionData)
        }
    }, [contributionData, session])

    return (
        <>
        <div className='w-full bg-white shadow-quiz-card border-2 border-gray-700 rounded-3xl flex flex-col items-center overflow-hidden lg:flex-row lg:py-16 lg:px-8'>
            <div className='relative w-full h-80 md:h-80 lg:hidden'>
                <Image src='/landing/contribute-img.svg' layout='fill' className='object-fit object-center' alt='contribute image' />
            </div>
            <div className='relative w-1/2 flex-shrink-0 rounded-3xl hidden lg:block' style={{height: 500}}>
                <Image src='/landing/contribute-img.svg' layout='fill' className='object-fit object-center' alt='contribute image' />
            </div>
            <form id='contribute-form' className='my-8 w-full px-8 lg:my-0' onSubmit={handleSubmit}>
                <p className='text-cust-purple tracking-widest font-semibold mb-1 lg:mb-2 lg:text-lg'>CONTRIBUTE</p>
                <h1 className='text-2xl font-semibold lg:text-3xl'>Give Us Your Idea</h1>
                <div className='flex gap-4 flex-col my-6 lg:my-8 lg:gap-6'>
                    <input type='text' className='px-4 py-2 bg-more-light-purple bg-opacity-60 w-full rounded-lg border focus:border-cust-purple outline-none' name='title' value={title} onChange={handleChange} placeholder='Title' autoComplete='off' required />
                    <select type='text' className='px-4 py-2 bg-more-light-purple bg-opacity-60 w-full rounded-lg border focus:border-cust-purple outline-none' name='category' value={category} onChange={handleChange} required>
                        {categories.map((category, index) => 
                            <option key={category._id} value={category._id}>{category.title}</option>    
                        )}
                    </select>
                    <textarea className='px-4 py-2 bg-more-light-purple bg-opacity-60 w-full rounded-lg border focus:border-cust-purple outline-none' name='description' value={description} onChange={handleChange} rows='6' placeholder='Describe more' required  />
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
        {loading && <div className='w-screen h-screen bg-black fixed left-0 top-0 bg-opacity-80 cursor-not-allowed flex items-center justify-center z-50'><Spinner width='30px' /></div>}
        </>
    );
}
 
export default ContributeForm;