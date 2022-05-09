import Image from "next/image";
import Link from "next/link";
import menuList from "./menuList";

const Footer = () => {
    return (
        <div className='flex flex-col w-full gap-10 px-8 py-16 text-center bg-text-primary md:px-20 lg:flex-row lg:justify-between lg:text-left'>
            <div className='flex flex-col items-center lg:items-start lg:w-1/4'>
                <Link href='/' >
                    <a>
                        <Image src='/logo/logo-white-text.svg' width={90} height={45} alt='logo-penesan-white' />
                    </a>
                </Link>
                <p className='mt-4 text-sm leading-normal text-gray-400 lg:mt-1 lg:text-base'>Jl. Colombo Yogyakarta No.1, Karang Malang, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281</p>
            </div>
            <div className='flex flex-col items-center lg:items-start'>
                <h1 className='text-xl font-bold text-white lg:text-2xl'>Menu</h1>
                <div className='flex justify-center w-full gap-6 mt-4 text-sm leading-normal text-gray-400 lg:text-base'>
                    {[...menuList, { name: 'Login', href: '/login' }].map((item, index) =>
                        <Link href={item.href} key={index}>
                            {item.name}
                        </Link>
                    )}
                </div>
            </div>
            <div className='flex flex-col items-center lg:items-start lg:w-1/4'>
                <h1 className='text-xl font-bold text-white lg:text-2xl'>Disclaimer</h1>
                <p className='mt-4 text-sm leading-normal text-gray-400 lg:text-base'>All content is provided for fun and entertainment purposes only.</p>
            </div>
        </div>
    );
}

export default Footer;