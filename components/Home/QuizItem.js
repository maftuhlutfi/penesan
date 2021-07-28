import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../imageUrlBuilder";

const QuizItem = ({slug, mainImage, index, title}) => {
    return (
        <Link key={index} href={`/quiz/${slug}`}>
            <div className={`w-full group h-80 relative rounded-2xl overflow-hidden shadow-quiz-card border-2 cursor-pointer border-gray-800 
                transform hover:translate-y-3 hover:shadow-none lg:rounded-3xl transition-all ease-in duration-200 ${index == 0 ? 'lg:row-span-2 lg:h-full' : 'lg:h-64'}`}>
                <Image src={urlFor(mainImage).url()} layout='fill' className='object-cover object-center' alt={`${title} image`} />
                <h1 className='absolute w-full p-4 bg-white text-xl bottom-0 font-bold lg:text-2xl lg:p-8 lg:-bottom-full transform lg:group-hover:bottom-0 transition-all ease-in duration-300'>{title}</h1>
            </div>
        </Link>
    );
}
 
export default QuizItem;