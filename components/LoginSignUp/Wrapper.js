const Wrapper = ({children}) => {
    return (
        <div className='w-full max-w-md bg-white rounded-2xl shadow-xl py-8 px-10'>
            {children}
        </div>
    );
}
 
export default Wrapper;