import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import menuList from "../menuList";

const NavItem = ({isHome}) => {
    const pathname = useRouter().pathname

    return (
        <div className='text-center text-lg max-w-max lg:mr-16 lg:flex gap-16 w-full justify-center leading-normal'>
            {menuList.map((item, index) => 
                <Link href={item.href} key={index}>
                    <p className={`py-2 cursor-pointer ${pathname == item.href && 'border-b-2 border-white font-bold'} ${isHome && 'lg:text-white'}`}>{item.name}</p>
                </Link>
            )}
        </div>
    );
}
 
export default NavItem;