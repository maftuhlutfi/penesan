import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState, useContext } from 'react'
import { LanguageContext } from '../../Context'
import LoginBtn from '../LoginBtn'
import Logo from '../Logo'
import Avatar from './Avatar'
import NavItem from './NavItem'

const Navigation = ({ dark }) => {
    const pathname = useRouter().pathname

    const { lang, changeLanguage } = useContext(LanguageContext)

    const [session, loading] = useSession()

    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        setShowMenu(false)
    }, [pathname])

    return (
        <nav className={`w-full px-8 z-20 transition-all ease-in duration-200 
             lg:px-24 lg:left-1/2 transform lg:-translate-x-1/2 bg-white pt-4 pb-4 fixed`}>
            <div className='flex items-center justify-between w-full max-w-[1536px] relative mx-auto'>
                <div className='flex items-center'>
                    <div className='hidden md:block'>
                        <Logo height={60} />
                    </div>
                    <div className='block md:hidden'>
                        <Logo height={45} />
                    </div>
                    <select className='p-2 ml-4 bg-red-100 rounded-lg lg:ml-8 focus:outline-none focus:ring-2 focus:ring-cust-red' value={lang} onChange={e => changeLanguage(e.target.value)}>
                        <option value='bug'>Bugis</option>
                        <option value='en'>English</option>
                    </select>
                </div>
                <div
                    onBlur={() => setShowMenu(false)}
                    className={`flex flex-col fixed w-screen h-screen top-0 right-0 bg-white pt-20 text-text-primary items-center 
                    lg:static lg:h-auto lg:w-auto lg:flex-row lg:pt-0 lg:bg-transparent lg:items-center
                    transform transition duration-500 ease-in-out ${!showMenu && 'translate-x-full lg:transform-none'}`}
                >
                    <NavItem />
                    {session ?
                        <Avatar />
                        :
                        <LoginBtn />
                    }
                </div>
                <div className="absolute z-20 block w-6 ml-2 cursor-pointer right-8 lg:hidden" onClick={() => setShowMenu(prev => !prev)}>
                    <span className={`block rounded-full absolute h-0.5 w-6 transform transition duration-500 ease-in-out bg-cust-purple ${showMenu ? 'rotate-45' : '-translate-y-2'}`} />
                    <span className={`block rounded-full absolute h-0.5 w-6 transform transition duration-500 ease-in-out bg-cust-purple ${showMenu && 'opacity-0 -translate-x-6'}`} />
                    <span className={`block rounded-full absolute h-0.5 w-6 transform transition duration-500 ease-in-out bg-cust-purple ${showMenu ? '-rotate-45' : 'translate-y-2'}`} />

                </div>
            </div>
        </nav>
    );
}

export default Navigation;