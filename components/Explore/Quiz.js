import QuizItem from "./QuizItem";

const Quiz = ({quiz}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12 w-full'>
            {quiz.map((item, index) =>
                <QuizItem key={index} {...item} />
            )}
        </div>
    );
}
 
export default Quiz;