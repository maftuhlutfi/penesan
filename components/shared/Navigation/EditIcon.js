const EditIcon = ({color, width}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={25} fill="none" viewBox="0 0 25 25">
            <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.69 3.162a2.83 2.83 0 014 4l-13.5 13.5-5.5 1.5 1.5-5.5 13.5-13.5z" />
        </svg>
    );
}
 
export default EditIcon;