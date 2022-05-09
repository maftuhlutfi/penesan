import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "../Context";

const Logo = ({ dark, width, height }) => {
    const { lang } = useContext(LanguageContext)

    return (
        <Link href='/' >
            <a>
                <Image src={lang == 'bug' ? '/logo/logo.svg' : '/logo/logo-latin.svg'} width={width || lang == 'bug' ? height * 2 : height * 2.3} height={height} alt='logo-debut' />
            </a>
        </Link>
    );
}

export default Logo;