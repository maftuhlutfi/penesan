import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import useTranslations from "../../hooks/useTranslations";
import { LanguageContext } from "../Context";
import menuList from "./menuList";

const Footer = () => {
    const isIndo = useContext(LanguageContext).lang == 'indo'
    const text = useTranslations('footer')

    return (
        <div className='flex flex-col w-full gap-10 px-8 py-16 text-center bg-text-primary md:px-20 lg:flex-row lg:justify-between lg:text-left'>
            <div className='flex flex-col items-center lg:items-start lg:w-1/4'>
                <Link href='/' >
                    <a>
                        <Image src={isIndo ? '/logo/logo-latin-white-text.svg' : '/logo/logo-white-text.svg'} width={156} height={45} alt='logo-penesan-white' />
                    </a>
                </Link>
                <p className='mt-4 text-sm leading-normal text-gray-400 lg:mt-2 lg:text-base'>{text[0][0]}</p>
            </div>
            <div className='flex flex-col items-center lg:items-start'>
                <h1 className='text-xl font-bold text-white lg:text-2xl'>{text[1][0]}</h1>
                <div className='flex justify-center w-full gap-6 mt-4 text-sm leading-normal text-gray-400 lg:text-base'>
                    {[...menuList, { name: 'Masuk || ᨆᨔᨘᨀᨛ', href: '/login' }].map((item, index) =>
                        <Link href={item.href} key={index}>
                            {isIndo ? item.name.split(" || ")[0] : item.name.split(" || ")[1]}
                        </Link>
                    )}
                </div>
            </div>
            <div className='flex flex-col items-center lg:items-start lg:w-1/4'>
                <h1 className='text-xl font-bold text-white lg:text-2xl'>{text[2][0]}</h1>
                <p className='mt-4 text-sm leading-normal text-gray-400 lg:text-base'>{text[2][1]}</p>
            </div>
        </div>
    );
}

export default Footer;