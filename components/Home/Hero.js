import Image from "next/image";
import Button from "../shared/Button";
import Section from "../shared/Section";

const Hero = () => {
    return (
        <Section>
            <div className='flex'>
                <div className='flex gap-3 flex-col mt-80 pt-8 md:mt-96 md:pt-32'>
                    <p>Tired with COVID-19 News?</p>
                    <h1 className='text-4xl font-bold leading-tight'>Get Covid Info with Fun</h1>
                    <p className='text-sm mb-2 text-text-secondary w-11/12 leading-relaxed'>Challenge yourself. See your future predictions, according to your knowledge of the plague. <span className='font-semibold italic'>(of course it's just a joke)</span></p>
                    <Button variant='primary'>
                        Get Started
                    </Button>
                </div>
                <div className='absolute min-w-full max-w-lg top-0 right-0 min-h-0' style={{height: 410}}>
                    <Image src='/hero-image-mobile.svg' layout='fill' className='object-cover object-bottom' />
                </div>
            </div>
        </Section>
    );
}
 
export default Hero;