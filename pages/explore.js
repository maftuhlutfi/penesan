import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import client from "../client";
import Container from "../components/shared/Container"
import CustomHead from "../components/shared/CustomHead"
import Section from "../components/shared/Section"
import { urlFor } from "../imageUrlBuilder";

const ExplorePage = ({quiz}) => {
    return (
        <>
            <CustomHead 
                title="Explore Quiz - DeBut"
                description="Explore all available quiz that give you informations in a fun way"
                url="https://debut.vercel.app/explore"
            />
            <Container>
                <Section>
                    <div className='flex flex-col items-center md:flex-row md:justify-between md:items-center mb-10'>
                        <h1 className='text-2xl lg:text-3xl font-semibold'>Explore All Quiz</h1>
                        <div className='flex mt-4 md:mt-0'>
                            <div className='flex cursor-pointer hover:bg-cust-purple hover:text-white items-center bg-white px-2 py-1 lg:py-3 lg:px-4 rounded-xl mr-4 text-sm md:text-base'>
                                <i className='icon-sort mr-2.5 text-sm md:text-base' />
                                Sort
                            </div>
                            <div className='flex cursor-pointer hover:bg-cust-purple hover:text-white items-center bg-white px-2 py-1 lg:py-3 lg:px-4 rounded-xl text-sm md:text-base'>
                                <i className='icon-filter mr-2.5 text-base md:text-lg' />
                                Filter
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 w-full'>
                        {quiz &&
                            quiz.map(({title, slug, mainImage}, index) =>
                            <Link key={index} href={`/quiz/${slug}`}>
                                <div className={`w-full group h-80 lg:h-96 relative rounded-2xl overflow-hidden shadow-quiz-card border-2 cursor-pointer border-gray-800 
                                    transform hover:translate-y-3 hover:shadow-none lg:rounded-3xl transition-all ease-in duration-200`}>
                                    <Image src={urlFor(mainImage).url()} layout='fill' className='object-cover object-center' alt={`${title} image`} />
                                    <h1 className='absolute w-full p-4 bg-white text-xl bottom-0 font-bold lg:text-2xl lg:p-8 lg:-bottom-full transform lg:group-hover:bottom-0 transition-all ease-in duration-300'>{title}</h1>
                                </div>
                            </Link>
                            )
                        }
                    </div>
                </Section>
            </Container>
        </>
    );
}
 
export default ExplorePage;

const quizQuery = groq`
    *[_type == "quiz"] | order(_createdAt desc) {
        title,
        'slug': slug.current,
        mainImage
    }
`

export async function getServerSideProps(context) {
    const quiz = await client.fetch(quizQuery)

    return {
        props: {
            quiz
        }, // will be passed to the page component as props
    }
}