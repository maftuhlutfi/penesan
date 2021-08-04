import Image from "next/image";
import { useEffect, useState } from "react";
import AvatarEditor from 'react-avatar-editor'

const AvatarInput = ({handleCrop, ...props}) => {
    const [scale, setScale] = useState(1)
    const [editor, setEditor] = useState(null)
    const [show, setShow] = useState(false)
    const [baseImg, setBaseImg] = useState('')
    
    const {file} = props

    const image = file ? URL.createObjectURL(file) : null

    useEffect(() => {
        file && !file.name.includes('avatar-picture-from-editor') && setShow(true)
    }, [file])

    const dataURLtoFile = dataurl => {
        console.log(dataurl)
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], 'avatar-picture-from-editor.png', {type:mime});
    }
    

    const handleClick = () => {
        if (editor) {
            handleCrop(dataURLtoFile(editor.getImageScaledToCanvas().toDataURL()))
            setBaseImg(editor.getImageScaledToCanvas().toDataURL())
        }
        setShow(false)
        setScale(1)
    }

    const setEditorRef = e => setEditor(e)

    return (
        <div className='flex w-full items-center justify-center mb-2'>
            <input id='avatar' className='w-0' {...props} />
            <label htmlFor='avatar' className='relative rounded-full overflow-hidden cursor-pointer w-20 h-20'>
                {
                    image ? 
                    <Image src={baseImg || image} width="80" height="80" alt='avatar-image' className='object-cover' />
                    :
                    <Image src='/icons/user-circled.svg' width={80} height={80} alt='default-avatar-image' />
                }
                <div className='text-xs absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white w-full text-center py-0.5'>
                    <Image src='/icons/camera.svg' width={14} height={14} alt='camera-icon' />
                </div>
            </label>
            {show && 
                <div className='fixed bg-black bg-opacity-50 w-screen h-screen top-0'>
                    <div className='fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 w-96 flex items-center justify-center flex-col py-8' style={{height: 'fit-content'}}>
                        <AvatarEditor
                            ref={setEditorRef}
                            image={image}
                            width={200}
                            height={200}
                            border={50}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={scale == 1 ? 1 : 1 + scale / 100}
                            rotate={0}
                        />
                        
                        <label htmlFor='scale' className='mt-3 mb-1'>Scale: </label>
                        <input id='scale' type="range" min="1" max="200" value={scale} onChange={e => setScale(e.target.value)} className='mb-4' />
                        <button className='w-full mt-2 bg-cust-purple text-white font-medium py-2 rounded' onClick={handleClick}>
                            Done
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default AvatarInput;