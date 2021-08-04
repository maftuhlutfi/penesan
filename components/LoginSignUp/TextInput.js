const TextInput = ({label, id, ...props}) => {
    return (
        <div className='text-sm'>
            <label htmlFor={id} className='block text-gray-700 font-medium mb-2 text-left'>{label}</label>
            <input {...props} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cust-purple' id={id} />
        </div>
    );
}
 
export default TextInput;