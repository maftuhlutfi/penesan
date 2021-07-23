import Image from "next/image";
import Link from 'next/link'
import { urlFor } from "../../imageUrlBuilder";
import Button from "../shared/Button";

import Section from "../shared/Section";

const Quiz = ({quiz}) => {
    return (
        <Section>
            <div className='text-center lg:text-left lg:w-full lg:flex lg:justify-between lg:items-end'>
                <div>
                    <p className='text-cust-purple tracking-widest font-semibold mb-2 lg:text-lg'>TOP QUIZ</p>
                    <h1 className='text-2xl font-semibold lg:text-3xl'>Choose Your Fun</h1>
                </div>
                <Button variant='primary' outlined style='hidden lg:block'>
                    See More
                </Button>
            </div>
            <div className='my-10 mb-12 flex flex-col gap-10 lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:my-16'>
                {quiz.map(({title, slug, mainImage}, index) => 
                    <Link key={index} href={`/quiz/${slug}`}>
                        <div className={`w-full group h-80 relative rounded-2xl overflow-hidden shadow-quiz-card border-2 cursor-pointer border-gray-800 
                            transform hover:translate-y-3 hover:shadow-none lg:rounded-3xl transition-all ease-in duration-200 ${index == 0 ? 'lg:row-span-2 lg:h-full' : 'lg:h-64'}`}>
                            <Image src={urlFor(mainImage).url()} layout='fill' className='object-cover object-center' />
                            <h1 className='absolute w-full p-4 bg-white text-xl bottom-0 font-bold lg:text-2xl lg:p-8 lg:-bottom-full transform lg:group-hover:bottom-0 transition-all ease-in duration-300'>{title}</h1>
                        </div>
                    </Link>
                )}
            </div>
            <div className='w-full flex justify-center lg:hidden'>
                <Button variant='primary' outlined>
                    See More
                </Button>
            </div>
        </Section>
    );
}
 
export default Quiz;