const Section = ({children, style, ...props}) => {
    return (
        <section className={`w-full px-6 max-w-screen-2xl py-2 pb-16 md:px-24 lg:px-36 relative mx-auto lg:pb-24 ${style}`} {...props}>
            {children}
        </section>
    );
}
 
export default Section;