import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

const DropdownBtn = ({icon, label, dropMenu, queryName}) => {
    const router = useRouter()

    const [showDrop, setShowDrop] = useState(false)
    const [active, setActive] = useState(0)

    useEffect(() => {
        const category = router.query.category

        if (category) {
            setActive(dropMenu.findIndex(value => value.toLowerCase() == category))
        } else {
            setActive(0)
        }
    })

    const handleClick = index => {
        if (index == 0) {
            delete router.query[queryName]
            router.push({
                path: router.pathname,
                query: router.query
            })
            return
        }

        router.push({
            path: router.pathname,
            query: {
                ...router.query,
                [queryName]: dropMenu[index].toLowerCase()
            }
        })
    }

    return (
        <button className={`flex relative cursor-pointer hover:bg-cust-purple hover:text-white 
            items-center py-3 px-4 rounded-xl text-sm md:text-base ${showDrop ? 'bg-cust-purple text-white' : 'bg-white'}`} 
            onClick={() => setShowDrop(prev => !prev)}
            onBlur={() => setShowDrop(false)}
        >
            <i className={`${icon} mr-2.5 text-sm md:text-base`} />
            {dropMenu[active]}
            <div className={`bg-white z-10 absolute top-full right-1/2 transform translate-x-1/2 mt-2 md:right-0 md:transform-none rounded-lg overflow-hidden md:text-left ${showDrop ? 'block' : 'hidden'}`}>
                {dropMenu.map((item, index) => 
                    <p key={index} onClick={() => handleClick(index)} className={`py-4 px-6 text-text-primary whitespace-nowrap ${active == index ? 'bg-cust-purple text-white' : 'bg-white hover:bg-gray-200'}`}>{item}</p>
                )}
            </div>
        </button>
    );
}
 
export default DropdownBtn;