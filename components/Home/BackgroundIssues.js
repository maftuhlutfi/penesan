import Image from "next/image";
import Link from "next/link";
import Section from "../shared/Section";

const BackgroundIssues = () => {
    return (
        <Section>
            <div className='flex flex-col items-center lg:flex-row-reverse lg:justify-center'>
                <div className='relative w-full max-w-[80%] h-96 lg:max-w-lg lg:h-screen max-h-[480px]'>
                    <Image src='/landing/issues-img.jpg' layout='fill' className='object-cover object-center rounded-[32px]' alt='issues image' />
                </div>
                <div className='px-4 mt-8 lg:max-w-md lg:mr-10'>
                    <h1 className='mb-2 text-2xl font-bold lg:text-5xl lg:leading-tight lg:mb-4'>Background Issues</h1>
                    <p className='mb-6 text-text-secondary lg:text-lg lg:leading-normal'>Tired of seeing pandemic news. We initiate educating in a way that encourages.</p>
                    <Link href='/about' passHref>
                        <a className='flex items-center font-semibold text-cust-red lg:text-lg group'>
                            Read more about us
                            <i className='ml-2 transition-all duration-100 ease-in transform rotate-180 icon-arrow-left group-hover:translate-x-2' />
                        </a>
                    </Link>
                </div>
            </div>
        </Section>
    );
}

export default BackgroundIssues;