import groq from "groq";
import { getProviders, signOut, useSession } from "next-auth/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import client from "../../../client";
import EditConfirmModal from "./EditConfirmModal";
import EditIcon from "./EditIcon";

const Avatar = () => {
    const [session, loading] = useSession()
    const [showDropMenu, setShowDropMenu] = useState(false)
    const [showEditConfirmModal, setShowEditConfirmModal] = useState(false)
    const [imageFile, setImageFile] = useState(null)

    const [userImage, setUserImage] = useState(null)
    const [provider, setProvider] = useState(null)

    const handleChange = e => {
        setImageFile(e.target.files[0])
        setShowEditConfirmModal(true)
    }

    useEffect(() => {
        const getUserImage = async () => {
            const userRes = await client.fetch(groq`
                *[_type == "user" && email == "${session.user.email}"][0] {
                    image
                }
            `)
            if (userRes) {
                setUserImage(userRes.image)
            }
        }
        getUserImage()
    }, [])

    return (
        <>
            <div className='flex items-center bg-cust-purple px-4 py-2 rounded-lg cursor-pointer relative group' onClick={() => setShowDropMenu(prev => !prev)} onBlur={() => setShowDropMenu(false)}>
                <div className='relative rounded-full w-10 h-10 transition-all ease-in duration-200'>
                    {session ?
                        <Image src={userImage || session.user.image || '/icons/user-circled.svg'} layout='fill' className='object-cover object-center rounded-full' />
                        :
                        <div className='w-full h-full bg-gray-400 animate-pulse' />
                    }
                    {userImage && userImage.includes('sanity') && <div className={`${userImage ? 'hidden group-hover:block' : 'block'}`}>
                        <label htmlFor='avatar-input' className='absolute cursor-pointer right-0 bottom-0 bg-light-purple rounded-full w-5 h-5 flex items-center justify-center border border-gray-700'>
                            <EditIcon color='#ffffff' width='12px' />
                        </label>
                        <input type='file' name='avatar-input' id='avatar-input' className='hidden' onChange={handleChange} />
                    </div>}
                </div>
                <div className='w-32 max-w-min ml-2 text-white'>
                    <p className='font-semibold truncate'>{session.user.name}</p>
                    <p className='text-xs truncate text-gray-200'>{session.user.email}</p>
                </div>
                {showDropMenu &&
                    <div className='bg-white w-full lg:w-auto p-4 absolute top-full mt-2 z-50 right-0 rounded-lg shadow-md flex flex-col' style={{height: 'fit-content'}}>
                        <button className='bg-cust-red text-white font-semibold px-4 py-2 rounded-lg' onClick={() => signOut()}>
                            Logout
                        </button>
                    </div>
                }
            </div>
            <EditConfirmModal
                show={showEditConfirmModal}
                file={imageFile}
            />
        </>
    );
}
 
export default Avatar;