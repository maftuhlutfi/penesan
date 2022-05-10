import Link from 'next/link'
import { useContext } from 'react';
import { LanguageContext } from '../Context';

const LoginBtn = ({ isHome }) => {
    const isIndo = useContext(LanguageContext).lang == 'indo'
    return (
        <Link href='/login'>
            <button className={`px-4 py-2 text-white w-10/12 lg:block rounded-lg mt-2 lg:mt-0 text-lg font-semibold transition-all ease-in duration-200 
                bg-cust-purple lg:shadow-purple hover:brightness-110 transform focus:translate-y-3 focus:shadow-none ${isHome && 'lg:bg-transparent border-2 border-white lg:hover:bg-white lg:hover:text-cust-purple focus:translate-y-0 lg:shadow-none'}`}>
                {isIndo ? 'Masuk' : 'ᨆᨔᨘᨀᨛ'}
            </button>
        </Link>
    );
}

export default LoginBtn;