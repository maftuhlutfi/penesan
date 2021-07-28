import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import LoginBtn from './LoginBtn'
import Logo from './Logo'

const Navigation = ({dark}) => {
    const isHome = useRouter().pathname == '/'

    return (
        <nav className={`flex items-center w-full justify-between px-8 pt-8 relative z-20 
             lg:px-24 lg:left-1/2 transform lg:-translate-x-1/2 ${isHome ? 'lg:absolute 2xl:px-48' : 'bg-white py-8 lg:fixed'}`}>
            <Logo dark={isHome} width={75} />
            <LoginBtn isHome={isHome} />
        </nav>
    );
}
 
export default Navigation;