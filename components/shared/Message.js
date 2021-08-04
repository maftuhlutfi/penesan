const Message = ({type, text}) => {
    return (
        <p className={`fixed top-0 left-0 w-full py-2 px-4 text-white text-center text-sm ${type == 'error' ? 'bg-red-500' : 'bg-green-600'}`}>{text}</p>
    );
}
 
export default Message;