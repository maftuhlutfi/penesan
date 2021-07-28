import Image from "next/image";
import Button from "../components/shared/Button";
import Container from "../components/shared/Container"
import CustomHead from "../components/shared/CustomHead"
import Section from "../components/shared/Section";

const AboutPage = () => {
    return (
        <>
            <CustomHead 
                title='DeBut - About Us'
                description='About DeBut Team'
                image='/about/us.svg'
            />
            <Container>
                <Section style='flex flex-col items-center justify-center lg:flex-row gap-8'>
                    <Image src='/about/us.svg' alt={'DeBut Team Image'} width={550} height={330} className='' />
                    <div className='max-w-md lg:ml-16'>
                        <h1 className='text-2xl lg:text-4xl font-bold mb-4 leading-normal'>About us</h1>
                        <p className='leading-normal text-text-secondary'>
                            Proin lacus justo, efficitur eget porta a, facilisis vel nulla. Nunc ullamcorper tempus dui, vel scelerisque 
                            augue dictum nec. Etiam convallis, magna vitae elementum convallis, justo augue semper tellus, eget vulputate sapien tellus sit amet tellus.
                        </p>
                        <Button variant='primary' style='mt-6'>
                            Connect with us!
                        </Button>
                    </div>
                </Section>
            </Container>
        </>
    );
}
 
export default AboutPage;