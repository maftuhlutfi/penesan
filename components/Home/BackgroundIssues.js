import Image from "next/image";
import Link from "next/link";
import Section from "../shared/Section";

const BackgroundIssues = () => {
    return (
        <Section>
            <div>
                <div className='relative w-full h-96'>
                    <Image src='/landing/issues-img.svg' layout='fill' className='object-cover object-center' />
                </div>
                <div className='mt-8 px-4'>
                    <h1 className='text-2xl font-bold mb-2'>Background Issues</h1>
                    <p className='text-text-secondary mb-6'>Tired of seeing pandemic news. We initiate educating in a way that encourages.</p>
                    <Link href='/about'>
                        <a className='text-cust-red font-semibold'>Read more about us</a>
                    </Link>
                </div>
            </div>
        </Section>
    );
}
 
export default BackgroundIssues;