const Button = ({children, variant, outlined}) => { 
    const variants = {
        primary: 'bg-cust-red text-white shadow-red',
        secondary: 'bg-cust-purple text-white shadow-purple',
    }

    const outlinedStyle = {
        primary: 'bg-transparent text-cust-red border-2 border-cust-red hover:text-white hover:bg-cust-red',
        secondary: 'bg-transparent text-cust-purple border-2 border-cust-purple hover:text-white hover:bg-cust-purple'
    }

    return (
        <button className={`px-5 py-2 flex w-min whitespace-nowrap rounded-lg font-semibold 
            transform focus:shadow-none focus:translate-y-2 hover:brightness-110 ${outlined ? outlinedStyle[variant] : variants[variant]}`}>
            {children}
        </button>
    );
}
 
export default Button;