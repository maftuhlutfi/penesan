import { useEffect, useState } from "react";

const FullscreenBtn = () => {
    const [fullscreen, setFullscreen] = useState(false)

    useEffect(() => {
        const elem = document.documentElement

        if (fullscreen) {
            // Open fullscreen
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
        } else {
            // Close fullscreen
            if (!document.exitFullscreen) {
                setFullscreen(false)
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                setFullscreen(false)
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                setFullscreen(false)
                document.msExitFullscreen();
            }
        }
    }, [fullscreen])

    return (
        <button className='flex items-center bg-white px-4 md:px-5 py-3 rounded-xl text-light-purple' onClick={() => setFullscreen(prev => !prev)}>
            <i className={`${fullscreen ? 'icon-minimize' : 'icon-maximize'}`} />
        </button>
    );
}
 
export default FullscreenBtn;