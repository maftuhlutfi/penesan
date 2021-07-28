import Image from "next/image";
import Link from "next/link";
import Section from "../shared/Section";

const BackgroundIssues = () => {
    return (
        <Section>
            <div className='flex flex-col items-center lg:flex-row-reverse lg:justify-center'>
                <div className='relative w-full h-96 max-w-xs lg:max-w-lg lg:h-screen' style={{maxHeight: 600}}>
                    <Image src='/landing/issues-img.svg' layout='fill' className='object-cover object-center' alt='issues image' />
                </div>
                <div className='mt-8 px-4 lg:max-w-md lg:mr-10'>
                    <h1 className='text-2xl font-bold mb-2 lg:text-5xl lg:leading-tight lg:mb-4'>Background Issues</h1>
                    <p className='text-text-secondary mb-6 lg:text-lg lg:leading-normal'>Tired of seeing pandemic news. We initiate educating in a way that encourages.</p>
                    <Link href='/about' passHref>
                        <a className='text-cust-red font-semibold lg:text-lg flex items-center group'>
                            Read more about us
                            <i className='icon-arrow-left transform rotate-180 ml-2 group-hover:translate-x-2 transition-all ease-in duration-100' />
                        </a>
                    </Link>
                </div>
            </div>
        </Section>
    );
}
 
export default BackgroundIssues;