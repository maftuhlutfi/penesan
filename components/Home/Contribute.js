import Image from "next/image";
import Link from "next/link";
import useTranslations from "../../hooks/useTranslations";
import Button from "../shared/Button";
import Section from "../shared/Section";

const Contribute = () => {
    const text = useTranslations('homePage')

    return (
        <Section>
            <div className='lg:flex lg:items-center'>
                <div className='relative w-full h-96 bg-more-light-purple rounded-2xl md:h-80 lg:hidden'>
                    <Image src='/landing/contribute-img.svg' layout='fill' className='object-center object-fit' alt='contribute image' />
                </div>
                <div className='hidden lg:block'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={1140} height={765} fill="none" viewBox="0 0 1140 765" className='relative -left-1/2'>
                        <path fill="#FCEEEC" d="M1140 148.181c0-42.05-32.55-76.923-74.5-79.811L85.496.887C39.259-2.297 0 34.352 0 80.698V684.79c0 46.9 40.16 83.74 86.887 79.703l980.003-84.676c41.36-3.573 73.11-38.189 73.11-79.703V148.181z" />
                    </svg>
                    <div className='absolute w-1/2 max-w-[550px] -mt-12 transform -translate-y-1/2 top-1/2 left-24 h-[490px]'>
                        <Image src='/landing/contribute-img.jpg' layout='fill' className='object-contain object-center rounded-[32px]' alt='contribute image' />
                    </div>
                </div>
                <div className='mt-8 lg:relative lg:-left-96 lg:-ml-8 lg:mt-0'>
                    <h1 className='mb-2 text-2xl font-bold lg:text-5xl lg:leading-tight lg:min-w-full lg:w-max lg:max-w-md'>{text[4][0]}</h1>
                    <p className='mb-6 text-text-secondary lg:text-lg lg:min-w-full lg:w-max lg:max-w-md'>{text[4][1]}</p>
                    <Link href='/contribute'>
                        <Button variant='primary'>
                            {text[4][2]}
                        </Button>
                    </Link>
                </div>
            </div>
        </Section>
    );
}

export default Contribute;