import { useEffect, useState } from "react";

const ScrollToTopBtn = () => {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', () => setScrollY(window.scrollY))
        return window.removeEventListener('scroll', null)
    }, [])

    const handleClick = () => {
        window.scrollTo(0, 0)
    }

    return (
        <button onClick={handleClick} className={`fixed right-6 bottom-8 lg:right-10 lg:bottom-10 bg-cust-purple px-2 py-4 rounded-lg transition-all ease-in duration-100 hover:-translate-y-2 ${scrollY <= 600 ? 'opacity-0' : 'opacity-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={20} fill="none" viewBox="0 0 46 26">
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M43 23L23 3 3 23" />
            </svg>
        </button>
    );
}
 
export default ScrollToTopBtn;