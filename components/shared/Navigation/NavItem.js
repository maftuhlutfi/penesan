import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import menuList from "../menuList";

const NavItem = ({isHome}) => {
    const pathname = useRouter().pathname

    return (
        <div className='flex text-center text-lg max-w-max flex-col gap-2 my-4 lg:mr-10 lg:flex-row lg:gap-10 w-full justify-center leading-normal'>
            {menuList.map((item, index) => 
                <Link href={item.href} key={index}>
                    <p className={`py-2 cursor-pointer ${pathname == item.href && 'border-b-4 font-bold'} ${isHome && 'lg:text-white'} ${pathname == item.href && isHome ? 'border-white' : 'border-cust-purple'}`}>{item.name}</p>
                </Link>
            )}
        </div>
    );
}
 
export default NavItem;