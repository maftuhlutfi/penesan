import Image from "next/image";
import Button from "../components/shared/Button";
import Container from "../components/shared/Container"
import CustomHead from "../components/shared/CustomHead"
import Section from "../components/shared/Section";

const AboutPage = () => {
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
                        <h1 className='text-2xl lg:text-4xl font-bold mb-4 leading-normal'>About us</h1>
                        <p className='leading-normal text-text-secondary'>
                            DeBut became the result of Team Me n Dem, to be submitted in the FAITH competition.
                            We consisted of three men from different regions, some on high land and others lowland.
                            The initial idea of making DeBut happened because we 'gabut', so intend to help other friends who are 'gabut' to gain new insights by fun games through DeBut.
                        </p>
                        <a href='mailto:ramadhanieko.2019@student.uny.ac.id?subject=Hai%20Team%20Me%20n%20Dem'>
                            <Button variant='primary' style='mt-6'>
                                Connect with us!
                            </Button>
                        </a>
                    </div>
                </Section>
            </Container>
        </>
    );
}

export default AboutPage;