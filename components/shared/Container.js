import { useRouter } from "next/dist/client/router";

const Container = ({children, ...props}) => {
    const isHome = useRouter().pathname == '/'

    return (
        <div className={`w-full min-h-screen bg-bg-purple ${isHome ? 'pt-16 lg:pt-0' : 'pt-32 lg:pt-44'}`} {...props}>
            {children}
        </div>
    );
}
 
export default Container;