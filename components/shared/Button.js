const Button = ({children, variant}) => { 
    const variants = {
        primary: 'bg-cust-red text-white shadow-red',
        secondary: 'bg-cust-purple text-white shadow-purple'
    }

    return (
        <button className={`px-5 py-2 flex w-min whitespace-nowrap rounded-lg font-semibold transform focus:shadow-none focus:translate-y-2 hover:brightness-110 ${variants[variant]}`}>
            {children}
        </button>
    );
}
 
export default Button;