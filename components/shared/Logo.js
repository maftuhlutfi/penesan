import Image from "next/image";
import Link from "next/link";

const Logo = ({dark, width, height}) => {
    return (
        <Link href='/' >
            <a>
                <Image src={dark ? '/logo/logo-debut-white-no-text.svg' : '/logo/logo-debut-colored-no-text.svg'} width={width || height * 2} height={height} alt='logo-debut' />
            </a>
        </Link>
    );
}
 
export default Logo;