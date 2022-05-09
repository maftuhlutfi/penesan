import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";
import Section from "../shared/Section";

const Hero = () => {
    return (
        <>
            <Section style='flex flex-col-reverse lg:flex-row pt-20 lg:pt-16 lg:-mb-40'>
                <div className='flex lg:max-w-4xl lg:justify-between lg:h-screen lg:max-h-[1024px] lg:items-center'>
                    <div className='flex flex-col gap-3 mt-16 lg:m-0 lg:w-1/2 lg:relative lg:-mt-20'>
                        <p className='lg:text-lg'>Tired with COVID-19 News?</p>
                        <h1 className='text-4xl font-bold leading-tight lg:text-6xl lg:leading-tight'>Get Covid Info with Fun</h1>
                        <p className='w-11/12 mb-2 text-sm leading-relaxed text-text-secondary lg:text-base'>Challenge yourself. See your future predictions, according to your knowledge of the plague. <span className='italic font-semibold'>(of course it's just a joke)</span></p>
                        <Link href='#quiz'>
                            <Button variant='primary'>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
                <Image src='/landing/hero-image.webp' width={721} height={481} layout='responsive' className='object-contain lg:hidden' alt='hero image desktop' />
            </Section>
            <div className="hidden lg:block lg:absolute lg:top-8 lg:right-0 w-6/12 h-screen max-h-[1024px]">
                <Image src='/landing/hero-image.webp' layout="fill" className='object-contain object-right' alt='hero image desktop' />
            </div>
        </>
    );
}

export default Hero;