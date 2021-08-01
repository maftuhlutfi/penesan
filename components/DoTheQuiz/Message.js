const Message = ({message, type}) => {
    return (
        <p className={`${type == 'correct' ? 'bg-green-500' : 'bg-red-500'} 
            text-white text-center text-sm md:text-base lg:text-lg py-2 px-4 fixed top-0 w-full left-0`}>
            {message}
        </p>
    );
}
 
export default Message;