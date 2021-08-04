import { signIn } from 'next-auth/client';
import Image from 'next/image'

const LoginWithSocialBtn = ({icon, label, provider}) => {
    return (
        <button className='w-full flex items-center shadow appearance-none border rounded px-4 py-2 text-sm hover:bg-more-light-purple' onClick={() => signIn(provider)}>
            <div className='h-4 w-4 relative mr-3'>
                <Image src={`/social-icons/${icon}.svg`} className='object-center object-cover' layout='fill' />
            </div>
            {label}
        </button>
    );
}
 
export default LoginWithSocialBtn;