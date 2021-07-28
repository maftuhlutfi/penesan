import groq from "groq";
import client from "../client";
import DropdownBtn from "../components/Explore/DropdownBtn";
import Quiz from "../components/Explore/Quiz";
import Container from "../components/shared/Container"
import CustomHead from "../components/shared/CustomHead"
import Section from "../components/shared/Section"

const ExplorePage = ({quiz, categories}) => {
    if (!quiz || !categories) {
        return <p>Loading...</p>
    }

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
                        <h1 className='text-3xl font-semibold'>Explore All Quiz</h1>
                        <div className='flex mt-6 md:mt-0'>
                            {/* <DropdownBtn 
                                icon='icon-sort'
                                label='Sort'
                                dropMenu={['Popular', 'Newest', 'Rating']}
                            /> */}
                            <DropdownBtn 
                                icon='icon-filter'
                                queryName='category'
                                dropMenu={['All Categories', ...categories.map(category => category.title)]}
                            />
                        </div>
                    </div>
                    <Quiz quiz={quiz} />
                </Section>
            </Container>
        </>
    );
}
 
export default ExplorePage;

const quizQuery = (category) => {
    if (category) {
        return `*[_type == "quiz" && count((categories[]->title)[@ match '${category}']) > 0] | order(_createdAt desc) {
            title,
            'slug': slug.current,
            mainImage,
            categories[]->{
                title
            }
        }` 
    }

    return groq`
        *[_type == "quiz"] | order(_createdAt desc) {
            title,
            'slug': slug.current,
            mainImage,
            categories[]->{
                title
            }
        }
    `
}

const categoryQuery = groq`
    *[_type == "category"] {
        title
    }
`

export async function getServerSideProps(context) {
    const {category} = context.query

    const quiz = await client.fetch(quizQuery(category))
    const categories = await client.fetch(categoryQuery)

    return {
        props: {
            quiz,
            categories
        }, // will be passed to the page component as props
    }
}