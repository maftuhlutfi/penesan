const Container = ({children}) => {
    return (
        <div className='bg-text-primary w-screen min-h-screen p-8 md:p-12 text-white'>
            {children}
        </div>
    );
}
 
export default Container;