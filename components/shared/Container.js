import { useRouter } from "next/dist/client/router";

const Container = ({children, ...props}) => {
    const isHome = useRouter().pathname == '/'

    return (
        <div className={`w-full h-auto lg:min-h-screen bg-bg-purple ${isHome ? 'pt-16 lg:pt-0' : 'pt-32 pb-8 lg:pt-44'}`} {...props}>
            {children}
        </div>
    );
}
 
export default Container;