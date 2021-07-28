import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../imageUrlBuilder";

const QuizItem = ({title, slug, mainImage, categories}) => {
    return (
        <Link href={`/quiz/${slug}`}>
            <div className={`w-full group h-80 lg:h-96 relative rounded-2xl overflow-hidden shadow-quiz-card border-2 cursor-pointer border-gray-800 
                transform hover:translate-y-3 hover:shadow-none lg:rounded-3xl transition-all ease-in duration-200`}>
                <Image src={urlFor(mainImage).url()} layout='fill' className='object-cover object-center' alt={`${title} image`} />
                <h1 className='absolute w-full p-4 bg-white text-xl bottom-0 font-bold lg:text-2xl lg:p-8 lg:-bottom-full transform lg:group-hover:bottom-0 transition-all ease-in duration-300'>{title}</h1>
                <div className='flex absolute top-4 gap-2 right-4 text-sm font-medium'>
                    {categories.map((category, index) => <p className='bg-white p-2 rounded-lg border-2 border-gray-700' key={index}>{category.title}</p>)}
                </div>
            </div>
        </Link>
    );
}
 
export default QuizItem;