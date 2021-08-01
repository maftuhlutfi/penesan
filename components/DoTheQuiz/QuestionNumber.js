const QuestionNumber = ({totalQuestions, current}) => {
    return (
        <p className='px-4 py-3 rounded-xl text-white border-2 border-white font-semibold'>{current} / {totalQuestions}</p>
    );
}
 
export default QuestionNumber;