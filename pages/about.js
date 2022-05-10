import Image from "next/image";
import Button from "../components/shared/Button";
import Container from "../components/shared/Container"
import CustomHead from "../components/shared/CustomHead"
import Section from "../components/shared/Section";
import useTranslations from "../hooks/useTranslations";

const AboutPage = () => {
    const text = useTranslations('aboutPage')

    return (
        <>
            <CustomHead
                title='Penesan - About Us'
                description='About Me n Dem Team'
                image='/about/us.svg'
            />
            <Container>
                <Section style='flex flex-col items-center justify-center lg:flex-row gap-8'>
                    <Image src='/about/us.svg' alt={'Me n Ndem Team Image'} width={550} height={330} className='' />
                    <div className='max-w-md lg:ml-16'>
                        <h1 className='mb-4 text-2xl font-bold leading-normal lg:text-4xl'>{text[0][0]}</h1>
                        <p className='leading-normal text-text-secondary'>
                            {text[0][1]}
                        </p>
                        <a href='mailto:ramadhanieko.2019@student.uny.ac.id?subject=Hai%20Team%20Me%20n%20Dem'>
                            <Button variant='primary' style='mt-6'>
                                {text[0][2]}
                            </Button>
                        </a>
                    </div>
                </Section>
            </Container>
        </>
    );
}

export default AboutPage;