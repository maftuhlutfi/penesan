import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import LoginBtn from './LoginBtn'
import Logo from './Logo'

const Navigation = ({dark}) => {
    const isHome = useRouter().pathname == '/'

    return (
        <nav className='flex items-center justify-between px-8 pt-8 relative z-20 md:bg-transparent'>
            <Logo dark={isHome} width={75} />
            <LoginBtn isHome={isHome} />
        </nav>
    );
}
 
export default Navigation;