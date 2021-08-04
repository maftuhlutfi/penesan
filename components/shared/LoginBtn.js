import Link from 'next/link'

const LoginBtn = ({isHome}) => {

    return (
        <Link href='/login'>
            <button className={`px-4 py-2 text-white w-10/12 lg:block rounded-lg mt-2 lg:mt-0 text-lg font-semibold transition-all ease-in duration-200 
                bg-cust-purple lg:shadow-purple hover:brightness-110 transform focus:translate-y-3 focus:shadow-none ${isHome && 'lg:bg-transparent border-2 border-white hover:bg-white hover:text-cust-purple focus:translate-y-0 lg:shadow-none'}`}>
                Login
            </button>
        </Link>
    );
}
 
export default LoginBtn;