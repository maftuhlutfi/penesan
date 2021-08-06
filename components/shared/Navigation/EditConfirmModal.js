import groq from "groq"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useState } from "react"
import AvatarEditor from "react-avatar-editor"
import client from '../../../client'
import Spinner from "../Spinner"

const EditConfirmModal = ({show, onCancel, onConfirm, file}) => {
    const [session, sessionLoading] = useSession()
    const router = useRouter()

    const [scale, setScale] = useState(1)
    const [editor, setEditor] = useState(null)
    const [loading, setLoading] = useState(false)

    const image = file ? URL.createObjectURL(file) : null

    const setEditorRef = e => setEditor(e)

    const dataURLtoFile = dataurl => {
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
    

    const handleClick = async () => {
        if (editor) {
            setLoading(true)
            const croppedImageFile = dataURLtoFile(editor.getImageScaledToCanvas().toDataURL())
            const userRes = await client.fetch(groq`
                *[_type == "user" && email == "${session.user.email}"][0] {
                    _id,
                    image
                }
            `)
            const {_id, image} = await userRes

            if(image) {
                client.delete(image.split("/")[6]).then((result) => {
                    console.log('deleted imageAsset', result)
                  })
            }
            
            client.assets
                .upload('file', croppedImageFile)
                .then((document) => {
                    console.log('The file was uploaded!', document)
                    client
                        .patch(_id)
                        .set({image: document.url})
                        .commit()
                        .then((updatedUser) => {
                            console.log(updatedUser)
                            setLoading(false)
                            router.reload()
                        })
                        .catch((err) => {
                            console.error('Oh no, the update failed: ', err.message)
                        })
                })
                .catch((error) => {
                    console.error('Upload failed:', error.message)
                })
        }
    }

    return (
        <div className={`w-screen h-screen bg-black bg-opacity-75 fixed top-0 left-0 flex items-center justify-center px-8 z-50 ${!show && 'hidden'}`}>
            <div className='bg-white p-8 w-full max-w-lg rounded-2xl text-center'>
                <h1 className='text-2xl font-bold mb-2'>Are You Sure?</h1>
                <p className='text-text-secondary'>This action will change your profile picture.</p>
                <div className='relative flex items-center justify-center flex-col mb-4'>
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
                    <label htmlFor='scale' className='mb-1'>Scale: </label>
                    <input id='scale' type="range" min="1" max="200" value={scale} onChange={e => setScale(e.target.value)} className='mb-4' />
                </div>
                <div className='mb-2 flex justify-center gap-4'>
                    <button className='text-lg px-4 py-2 border-2 border-cust-red rounded-lg font-semibold hover:bg-cust-red hover:text-white' onClick={onCancel}>
                        Cancel
                    </button>
                    <button className='text-lg px-4 py-2 bg-cust-red rounded-lg font-semibold text-white hover:brightness-110' onClick={handleClick}>
                        Change
                    </button>
                </div>
            </div>
            {loading && <div className='w-screen h-screen bg-black fixed left-0 top-0 bg-opacity-80 cursor-not-allowed flex items-center justify-center z-50'><Spinner width='30px' /></div>}
        </div>
    );
}
 
export default EditConfirmModal;