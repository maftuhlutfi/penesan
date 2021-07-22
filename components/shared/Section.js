const Section = ({children, style, ...props}) => {
    return (
        <section className={`w-full px-6 py-2 mb-16 ${style}`} {...props}>
            {children}
        </section>
    );
}
 
export default Section;