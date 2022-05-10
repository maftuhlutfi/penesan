import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../imageUrlBuilder";

const QuizItem = ({ title, slug, mainImage, categories }) => {
    return (
        <Link href={`/quiz/${slug}`}>
            <div className={`w-full group h-80 lg:h-96 relative rounded-2xl overflow-hidden shadow-quiz-card border-2 cursor-pointer border-gray-800 
                transform hover:translate-y-3 hover:shadow-none lg:rounded-3xl transition-all ease-in duration-200`}>
                <Image src={urlFor(mainImage).url()} layout='fill' className='object-cover object-center' alt={`${title} image`} />
                <h1 className='absolute bottom-0 w-full p-4 text-xl font-bold transition-all duration-300 ease-in transform bg-white lg:text-2xl lg:p-8'>{title}</h1>
                <div className='absolute flex gap-2 text-sm font-medium top-4 right-4'>
                    {categories.map((category, index) => <p className='p-2 bg-white border-2 border-gray-700 rounded-lg' key={index}>{category.title}</p>)}
                </div>
            </div>
        </Link>
    );
}

export default QuizItem;