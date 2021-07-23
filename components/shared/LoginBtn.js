import Link from 'next/link'

const LoginBtn = ({isHome}) => {

    return (
        <Link href='/login'>
            <button className={`text-white px-4 py-2 rounded-xl lg:text-lg font-semibold transition-all ease-in duration-200 ${isHome ? 'border-white hover:bg-white hover:text-cust-purple' : 'bg-cust-purple shadow-purple hover:brightness-110 transform focus:translate-y-3 focus:shadow-none'}`}>
                Login
            </button>
        </Link>
    );
}
 
export default LoginBtn;