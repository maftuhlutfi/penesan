import Link from 'next/link'
import useTranslations from '../../hooks/useTranslations';
import Button from "../shared/Button";

import Section from "../shared/Section";
import QuizItem from "./QuizItem";

const Quiz = ({ quiz }) => {
    const text = useTranslations('homePage')

    return (
        <Section id='quiz'>
            <div className='text-center lg:text-left lg:w-full lg:flex lg:justify-between lg:items-end'>
                <div>
                    <p className='mb-2 font-semibold tracking-widest text-cust-purple lg:text-lg'>{text[1][0]}</p>
                    <h1 className='text-2xl font-semibold lg:text-3xl'>{text[1][1]}</h1>
                </div>
                <Link href='/explore' passHref>
                    <Button variant='primary' outlined style='hidden lg:block'>
                        {text[1][2]}
                    </Button>
                </Link>
            </div>
            <div className='flex flex-col my-10 mb-12 gap-x-8 gap-y-10 lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:my-16'>
                {quiz.map((item, index) =>
                    <QuizItem
                        key={index}
                        index={index}
                        {...item}
                    />
                )}
            </div>
            <div className='flex justify-center w-full lg:hidden'>
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