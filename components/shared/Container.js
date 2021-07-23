const Container = ({children, ...props}) => {
    return (
        <div className='w-full min-h-screen bg-bg-purple' {...props}>
            {children}
        </div>
    );
}
 
export default Container;