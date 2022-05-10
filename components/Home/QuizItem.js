import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../imageUrlBuilder";
import { useContext } from "react";
import { LanguageContext } from "../Context";


const QuizItem = ({ slug, mainImage, index, title }) => {
    const isIndo = useContext(LanguageContext).lang == 'indo'

    return (
        <Link key={index} href={`/quiz/${slug}`}>
            <div className={`w-full group h-80 relative rounded-2xl overflow-hidden shadow-quiz-card border-2 cursor-pointer border-gray-800 
                transform hover:translate-y-3 hover:shadow-none lg:rounded-3xl transition-all ease-in duration-200 ${index == 0 ? 'lg:row-span-2 lg:h-full' : 'lg:h-64'}`}>
                <Image src={urlFor(mainImage).url()} layout='fill' className='object-cover object-center' alt={`${title} image`} />
                <h1 className='absolute bottom-0 w-full p-4 text-xl font-bold transition-all duration-300 ease-in transform bg-white lg:text-2xl lg:p-8'>
                    {isIndo ? title.split(" || ")[0] : title.split(" || ")[1]}
                </h1>
            </div>
        </Link>
    );
}

export default QuizItem;