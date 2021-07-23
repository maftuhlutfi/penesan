import Link from "next/link";
import Logo from "./Logo"

const menu = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Explore',
        href: '/explore'
    },
    {
        name: 'About',
        href: '/about'
    },
    {
        name: 'Login',
        href: '/login'
    }
]

const Footer = () => {
    return (
        <div className='w-full bg-text-primary text-center px-8 py-16 flex flex-col gap-10 md:px-20 lg:flex-row lg:justify-between lg:text-left'>
            <div className='flex items-center flex-col lg:w-1/4'>
                <Logo height={18} dark footer />
                <p className='text-sm text-gray-400 mt-4 leading-normal lg:text-base'>Jl. Colombo Yogyakarta No.1, Karang Malang, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281</p>
            </div>
            <div className='flex items-center flex-col lg:items-start'>
                <h1 className='text-xl text-white font-bold lg:text-2xl'>Menu</h1>
                <div className='text-sm text-gray-400 mt-4 flex gap-6 w-full justify-center leading-normal lg:text-base'>
                    {menu.map((item, index) => 
                        <Link href={item.href} key={index}>
                            {item.name}
                        </Link>
                    )}
                </div>
            </div>
            <div className='flex items-center flex-col lg:items-start lg:w-1/4'>
                <h1 className='text-xl text-white font-bold lg:text-2xl'>Disclaimer</h1>
                <p className='text-sm text-gray-400 mt-4 leading-normal lg:text-base'>All content is provided for fun and entertainment purposes only.</p>
            </div>
        </div>
    );
}
 
export default Footer;