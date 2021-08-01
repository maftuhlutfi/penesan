const AnswersContainer = ({children}) => {
    return (
        <div className='flex flex-wrap mb-10 lg:mb-16 gap-x-4 gap-y-8 justify-center w-full'>
            {children}
        </div>
    );
}
 
export default AnswersContainer;