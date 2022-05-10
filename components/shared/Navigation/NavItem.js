import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "../../Context";
import menuList from "../menuList";

const NavItem = ({ isHome }) => {
    const isIndo = useContext(LanguageContext).lang == 'indo'
    const pathname = useRouter().pathname

    return (
        <div className='flex flex-col justify-center w-full gap-2 my-4 text-lg leading-normal text-center max-w-max lg:mr-10 lg:flex-row lg:gap-10'>
            {menuList.map((item, index) =>
                <Link href={item.href} key={index}>
                    <a className={`py-2 cursor-pointer whitespace-nowrap ${pathname == item.href && 'border-b-4 font-bold'} ${isHome && 'lg:text-white'} ${pathname == item.href && isHome ? 'border-white' : 'border-cust-purple'}`}>
                        {isIndo ? item.name.split(" || ")[0] : item.name.split(" || ")[1]}
                    </a>
                </Link>
            )}
        </div>
    );
}

export default NavItem;