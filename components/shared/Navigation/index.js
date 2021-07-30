import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LoginBtn from '../LoginBtn'
import Logo from '../Logo'
import menuList from '../menuList'
import NavItem from './NavItem'

const Navigation = ({dark}) => {
    const pathname = useRouter().pathname
    const isHome = pathname == '/'

    const [showMenu, setShowMenu] = useState(false)
    const [scrollYPos, setScrollYPos] = useState(0)

    useEffect(() => {
        setShowMenu(false)
    }, [pathname])

    useEffect(() => {
        window.addEventListener('scroll', () => setScrollYPos(window.scrollY))
        return window.removeEventListener('scroll', null)
    }, [])

    return (
        <nav className={`flex items-center w-full justify-between px-8 z-20 transition-all ease-in duration-200 
             lg:px-24 lg:left-1/2 transform lg:-translate-x-1/2 ${isHome && scrollYPos <= 70 ? 'lg:absolute fixed pt-8 pb-1' : 'bg-white pt-8 pb-8 fixed'}`}>
            <Logo dark={isHome && scrollYPos <= 70} width={75} />
            <div 
                onBlur={() => setShowMenu(false)} 
                className={`flex flex-col fixed w-screen h-screen top-0 right-0 bg-white pt-20 text-text-primary items-center 
                    lg:static lg:h-auto lg:w-auto lg:flex-row lg:pt-0 lg:bg-transparent lg:items-center
                    transform transition duration-500 ease-in-out ${!showMenu && 'translate-x-full lg:transform-none'}`}
            >
                <NavItem isHome={isHome && scrollYPos <= 70} />
                <LoginBtn isHome={isHome && scrollYPos <= 70} />
            </div>
            <div className="absolute right-8 block w-6 ml-2 lg:hidden z-20" onClick={() => setShowMenu(prev => !prev)}>
                {isHome && scrollYPos <= 70 ?
                    <>
                        <span className={`block rounded-full absolute h-0.5 w-6 transform transition duration-500 ease-in-out ${showMenu ? 'rotate-45 bg-cust-purple' : '-translate-y-2 bg-white'}`} />
                        <span className={`block rounded-full absolute h-0.5 w-6 transform transition duration-500 ease-in-out ${showMenu ? 'opacity-0 -translate-x-6' : 'bg-white'}`} />
                        <span className={`block rounded-full absolute h-0.5 w-6 transform transition duration-500 ease-in-out ${showMenu ? '-rotate-45 bg-cust-purple' : 'translate-y-2 bg-white'}`} />
                    </>
                    :
                    <>
                        <span className={`block rounded-full absolute h-0.5 w-6 transform transition duration-500 ease-in-out bg-cust-purple ${showMenu ? 'rotate-45' : '-translate-y-2'}`} />
                        <span className={`block rounded-full absolute h-0.5 w-6 transform transition duration-500 ease-in-out bg-cust-purple ${showMenu && 'opacity-0 -translate-x-6'}`} />
                        <span className={`block rounded-full absolute h-0.5 w-6 transform transition duration-500 ease-in-out bg-cust-purple ${showMenu ? '-rotate-45' : 'translate-y-2'}`} />
                    </>
                }
            </div>
        </nav>
    );
}
 
export default Navigation;