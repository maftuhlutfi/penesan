import Image from "next/image";
import Link from 'next/link'
import { urlFor } from "../../imageUrlBuilder";
import Button from "../shared/Button";

import Section from "../shared/Section";

const Quiz = ({quiz}) => {
    return (
        <Section>
            <div className='text-center'>
                <p className='text-cust-purple tracking-widest font-semibold mb-2'>TOP QUIZ</p>
                <h1 className='text-2xl font-semibold'>Choose Your Fun</h1>
            </div>
            <div className='my-10 mb-12 flex flex-col gap-10'>
                {quiz.map(({title, slug, mainImage}, index) => 
                    <Link key={index} href={`/quiz/${slug}`}>
                        <div className='w-full h-80 relative rounded-2xl overflow-hidden shadow-quiz-card border-2 cursor-pointer border-gray-800 
                            transform hover:translate-y-3 hover:shadow-none'>
                            <Image src={urlFor(mainImage).url()} layout='fill' className='object-cover object-center' />
                            <h1 className='absolute w-full p-4 bg-white text-xl bottom-0 font-bold'>{title}</h1>
                        </div>
                    </Link>
                )}
            </div>
            <div className='w-full flex justify-center'>
                <Button variant='primary' outlined>
                    See More
                </Button>
            </div>
        </Section>
    );
}
 
export default Quiz;