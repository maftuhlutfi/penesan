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
        <div className='w-full bg-text-primary text-center px-8 py-16 flex flex-col gap-10'>
            <div className='flex items-center flex-col'>
                <Logo height={18} dark />
                <p className='text-sm text-gray-400 mt-4 leading-normal'>Jl. Colombo Yogyakarta No.1, Karang Malang, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281</p>
            </div>
            <div className='flex items-center flex-col'>
                <h1 className='text-xl text-white font-bold'>Menu</h1>
                <div className='text-sm text-gray-400 mt-4 flex gap-6 w-full justify-center leading-normal'>
                    {menu.map((item, index) => 
                        <Link href={item.href} key={index}>
                            {item.name}
                        </Link>
                    )}
                </div>
            </div>
            <div className='flex items-center flex-col'>
                <h1 className='text-xl text-white font-bold'>Disclaimer</h1>
                <p className='text-sm text-gray-400 mt-4 leading-normal'>All content is provided for fun and entertainment purposes only.</p>
            </div>
        </div>
    );
}
 
export default Footer;