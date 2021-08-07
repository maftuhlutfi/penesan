import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";
import Section from "../shared/Section";

const Hero = () => {
    return (
        <>
            <Section>
                <div className='flex lg:max-w-4xl lg:justify-end lg:h-screen lg:items-center'>
                    <div className='flex gap-3 flex-col mt-80 pt-8 md:mt-96 md:pt-32 lg:m-0 lg:w-1/2 lg:relative lg:right-1/2 lg:p-0'>
                        <p className='lg:text-lg'>Tired with COVID-19 News?</p>
                        <h1 className='text-4xl font-bold leading-tight lg:text-6xl lg:leading-tight'>Get Covid Info with Fun</h1>
                        <p className='text-sm mb-2 text-text-secondary w-11/12 leading-relaxed lg:text-base'>Challenge yourself. See your future predictions, according to your knowledge of the plague. <span className='font-semibold italic'>(of course it's just a joke)</span></p>
                        <Link href='#quiz'>
                            <Button variant='primary'>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                    <div className='absolute min-w-full max-w-lg -top-16 right-0 min-h-0 md:hidden lg:hidden' style={{height: '110vw', maxHeight: 410}}>
                        <Image src='/landing/hero-image-mobile.svg' layout='fill' className='object-cover object-bottom' alt='hero image mobile' />
                    </div>
                    <div className='absolute w-5/6 -top-20 right-0 min-h-0 hidden md:block lg:hidden' style={{height: '75vw', maxHeight: 600}}>
                        <Image src='/landing/hero-image-mobile.svg' layout='fill' className='object-cover object-bottom' alt='hero image mobile' />
                    </div>
                </div>
            </Section>
            <div className='absolute top-0 right-0 h-full hidden lg:block w-6/12' style={{maxHeight: 1024}}>
                <Image src='/landing/hero-image.svg' layout='fill' className='object-cover object-left-bottom' alt='hero image desktop' />
            </div>
        </>
    );
}
 
export default Hero;