import { signOut, useSession } from "next-auth/client";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button";

const Avatar = () => {
    const [session, loading] = useSession()
    const [showDropMenu, setShowDropMenu] = useState(false)

    return (
        <div className='flex items-center bg-cust-purple px-4 py-2 rounded-lg cursor-pointer relative' onClick={() => setShowDropMenu(prev => !prev)} onBlur={() => setShowDropMenu(false)}>
            <div className='relative rounded-full w-10 h-10 transition-all ease-in duration-200'>
                {session ?
                    <Image src={session.user.image || '/icons/user-circled.svg'} layout='fill' className='object-cover object-center rounded-full' />
                    :
                    <div className='w-full h-full bg-gray-400 animate-pulse' />
                }
            </div>
            <div className='w-32 max-w-min ml-2 text-white'>
                <p className='font-semibold truncate'>{session.user.name}</p>
                <p className='text-xs truncate text-gray-200'>{session.user.email}</p>
            </div>
            {showDropMenu &&
                <div className='bg-white w-full lg:w-auto py-4 absolute top-full mt-2 z-50 right-0 rounded-lg shadow-md flex flex-col' style={{height: 'fit-content'}}>
                    <a className='px-8 py-2 text-center whitespace-nowrap hover:bg-gray-200'>My result</a>
                    <div className='px-6 py-2 text-center whitespace-nowrap hover:bg-gray-200'>
                        <button className='bg-cust-red text-white font-semibold px-4 py-2 rounded-lg' onClick={() => signOut()}>
                            Logout
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Avatar;