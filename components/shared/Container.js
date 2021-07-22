const Container = ({children, ...props}) => {
    return (
        <div className='w-screen min-h-screen bg-bg-purple' {...props}>
            {children}
        </div>
    );
}
 
export default Container;