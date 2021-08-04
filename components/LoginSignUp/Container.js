const Container = ({children}) => {
    return (
        <div className='w-screen min-h-screen bg-more-light-purple flex items-center justify-center p-8 py-16'>
            {children}
        </div>
    );
}
 
export default Container;