const Section = ({children, ...props}) => {
    return (
        <div className='w-full px-6 py-2'>
            {children}
        </div>
    );
}
 
export default Section;