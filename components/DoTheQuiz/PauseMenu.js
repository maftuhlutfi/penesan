import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import Button from "../shared/Button"

const PauseMenu = ({totalCorrect, retryQuiz}) => {
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false)

    const handleRetry = () => {
        setShowMenu(false)
        retryQuiz()
    }

    return (
        <>
            <button onClick={() => setShowMenu(true)} className='flex items-center bg-white px-4 md:px-5 py-3 rounded-xl text-light-purple'>
                <i className='icon-pause' />
            </button>
            {showMenu && <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-40 flex items-center justify-center px-8'>
                <div className='bg-white w-full rounded-2xl text-text-primary py-10 px-8 text-base flex flex-col items-center max-w-sm relative'>
                    <h1 className='font-bold text-center text-xl mb-2'>Pause Menu</h1>
                    <p className='mb-6 text-text-secondary'>Your correct answers total: <b>{totalCorrect}</b></p>
                    <Button variant='secondary' style='mb-6' onClick={handleRetry}>
                        <i className='icon-rotate mr-3 text-base' />
                        Retry
                    </Button>
                    <Button variant='primary' style='mb-2' onClick={() => router.back()}>
                        <i className='icon-arrow-left mr-3 text-base' />
                        Back
                    </Button>
                    <button onClick={() => setShowMenu(false)} className='text-xl text-text-secondary absolute top-4 right-6'>✖</button>
                </div>
            </div>}
        </>
    );
}
 
export default PauseMenu;