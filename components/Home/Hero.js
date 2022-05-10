import Image from "next/image";
import Link from "next/link";
import useTranslations from "../../hooks/useTranslations";
import Button from "../shared/Button";
import Section from "../shared/Section";

const Hero = () => {
    const text = useTranslations('homePage')

    return (
        <>
            <Section style='flex flex-col-reverse lg:flex-row pt-20 lg:pt-16 lg:-mb-40'>
                <div className='flex lg:justify-between lg:h-screen lg:max-h-[1024px] lg:items-center'>
                    <div className='flex flex-col gap-3 mt-16 lg:m-0 lg:w-[600px] lg:max-w-1/2 lg:relative lg:-mt-20'>
                        <p className='lg:text-lg'>{text[0][0]}</p>
                        <h1 className='text-4xl font-bold leading-tight lg:text-6xl lg:leading-tight'>{text[0][1]}</h1>
                        <p className='w-full max-w-[400px] mb-2 text-sm leading-relaxed text-text-secondary lg:text-base'>{text[0][2]}</p>
                        <Link href='#quiz'>
                            <Button variant='primary'>
                                {text[0][3]}
                            </Button>
                        </Link>
                    </div>
                </div>
                <Image src='/landing/hero-image.webp' width={721} height={481} layout='responsive' className='object-contain lg:hidden' alt='hero image mobile' />
            </Section>
            <div className="hidden lg:block lg:absolute lg:top-8 lg:right-0 w-6/12 h-screen max-h-[1024px]">
                <Image src='/landing/hero-image.webp' layout="fill" className='object-contain object-right' alt='hero image desktop' />
            </div>
        </>
    );
}

export default Hero;