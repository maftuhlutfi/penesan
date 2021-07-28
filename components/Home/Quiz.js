import Link from 'next/link'
import Button from "../shared/Button";

import Section from "../shared/Section";
import QuizItem from "./QuizItem";

const Quiz = ({quiz}) => {
    return (
        <Section id='quiz'>
            <div className='text-center lg:text-left lg:w-full lg:flex lg:justify-between lg:items-end'>
                <div>
                    <p className='text-cust-purple tracking-widest font-semibold mb-2 lg:text-lg'>TOP QUIZ</p>
                    <h1 className='text-2xl font-semibold lg:text-3xl'>Choose Your Fun</h1>
                </div>
                <Link href='/explore' passHref>
                    <Button variant='primary' outlined style='hidden lg:block'>
                        See More
                    </Button>
                </Link>
            </div>
            <div className='my-10 mb-12 flex flex-col gap-x-8 gap-y-10 lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:my-16'>
                {quiz.map((item, index) => 
                    <QuizItem 
                        key={index}
                        index={index}
                        {...item}
                    />
                )}
            </div>
            <div className='w-full flex justify-center lg:hidden'>
                <Link href='/explore' passHref>
                    <Button variant='primary' outlined>
                        See More
                    </Button>
                </Link>
            </div>
        </Section>
    );
}
 
export default Quiz;