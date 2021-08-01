const AnswerBtn = ({selected, isCorrectAnswer, children, isUserAnswered, onClick}) => {
    console.log(selected, children)

    return (
        <button onClick={onClick} className={`px-5 py-2 flex items-center w-min whitespace-nowrap rounded-lg font-semibold 
            transform focus:shadow-none focus:translate-y-2 hover:brightness-110 lg:text-xl transition-all ease-in duration-200
            ${!isUserAnswered && 'bg-cust-red shadow-red'}
            ${isUserAnswered && selected && !isCorrectAnswer && 'bg-cust-red shadow-red'}
            ${isUserAnswered && !selected && 'border-2 border-white bg-transparent'}
            ${isUserAnswered && isCorrectAnswer && 'bg-green-500 border-none shadow-green wiggle 1s ease-in-out infinite'}
            `}
        >
                {children}
        </button>
    );
}
 
export default AnswerBtn;