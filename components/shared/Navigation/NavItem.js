import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import menuList from "../menuList";

const NavItem = ({ isHome }) => {
    const pathname = useRouter().pathname

    return (
        <div className='flex flex-col justify-center w-full gap-2 my-4 text-lg leading-normal text-center max-w-max lg:mr-10 lg:flex-row lg:gap-10'>
            {menuList.map((item, index) =>
                <Link href={item.href} key={index}>
                    <p className={`py-2 cursor-pointer whitespace-nowrap ${pathname == item.href && 'border-b-4 font-bold'} ${isHome && 'lg:text-white'} ${pathname == item.href && isHome ? 'border-white' : 'border-cust-purple'}`}>{item.name}</p>
                </Link>
            )}
        </div>
    );
}

export default NavItem;