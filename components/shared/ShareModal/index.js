import { useEffect, useState } from "react";
import Button from "../Button"
import socmedList from "./socmedList";

const ShareModal = ({onCancel, show, text}) => {
    const [location, setLocation] = useState('')

    useEffect(() => {
        setLocation(window.location.href)
    })

    return (
        <div className={`w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-75 z-30 flex items-center justify-center ${show ? 'block' : 'hidden'}`}>
            <div className='bg-white flex flex-col justify-center items-center rounded-xl p-8'>
                <div className='flex gap-6 text-2xl lg:text-3xl text-white mb-8'>
                    {socmedList.map((item, index) => 
                        <a href={item.shareLink(location, text)} key={index} className={`w-10 h-10 rounded-md lg:w-14 lg:h-14 lg:rounded-xl flex justify-center items-center ${item.bg}`}>
                            <i className={`icon-${item.name}`} />
                        </a>
                    )}
                </div>
                <Button variant='primary' outlined onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
 
export default ShareModal;