import Image from "next/image"
import { useState } from "react"

const ContributeItem = ({title, user, _createdAt, description, category}) => {
    const [showDesc, setShowDesc] = useState(false)

    const formatDate = d => {
        const date = new Date(d)
        const months = ['Januari', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember']
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }

    return (
        <div className='w-full p-8 bg-white rounded-xl shadow-quiz-card mb-2'>
            <div className='flex items-center gap-4 mb-8'>
                <div className='h-12 w-12 relative rounded-full overflow-hidden'>
                    <Image src={user.image || '/icons/user-circled.svg'} layout='fill' className='object-cover object-center' />
                </div>
                <div>
                    <h5 className='font-bold mb-1'>{user.name}</h5>
                    <p className='text-sm text-text-secondary'>{formatDate(_createdAt)}</p>
                </div>
            </div>
            <p className={`leading-normal mb-1 text-sm md:text-base ${!showDesc && 'line-clamp-3'}`}><b className='font-semibold'>{title}</b> — {description}</p>
            {description.length > 165 && <p className='font-semibold text-cust-purple hover:underline cursor-pointer text-sm lg:hidden' onClick={() => setShowDesc(prev => !prev)}>{showDesc ? 'Show less' : 'Show more'}</p>}
            {description.length > 175 && <p className='font-semibold text-cust-purple hover:underline cursor-pointer hidden lg:block' onClick={() => setShowDesc(prev => !prev)}>{showDesc ? 'Show less' : 'Show more'}</p>}
            <p className='px-4 py-2 bg-cust-yellow w-min whitespace-nowrap rounded-lg text-sm mt-6'>{category.title}</p>
        </div>
    );
}
 
export default ContributeItem;