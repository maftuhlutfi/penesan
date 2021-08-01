const AnswersContainer = ({children}) => {
    return (
        <div className='grid mb-10 lg:mb-16 grid-flow-col gap-x-4 gap-y-6 justify-center auto-cols-min w-full'>
            {children}
        </div>
    );
}
 
export default AnswersContainer;