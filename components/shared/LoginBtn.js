import Link from 'next/link'

const LoginBtn = ({isHome}) => {

    return (
        <Link href='/login'>
            <button className={`text-white px-4 py-2 border-2 rounded-xl font-semibold ${isHome ? 'border-white' : 'border-text-primary bg-cust-purple shadow-purple'}`}>
                Login
            </button>
        </Link>
    );
}
 
export default LoginBtn;