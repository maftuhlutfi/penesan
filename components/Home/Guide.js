import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";
import Section from "../shared/Section";

const Guide = () => {
    const guide = [
        'Select the desired quiz category.',
        'Work on the problem with each other\'s intelligence.',
        'Get future predictions, based on answers.  Don\'t forget to share with your friends.'
    ]
    
    return (
        <Section>
            <div className='w-full px-8 py-12 bg-more-light-purple rounded-2xl flex flex-col items-center md:px-12 lg:flex-row lg:justify-between lg:rounded-3xl'>
                <div className='text-center lg:hidden'>
                    <p className='text-cust-purple tracking-widest font-semibold mb-2 lg:text-lg'>HOW TO</p>
                    <h1 className='text-2xl font-semibold lg:text-3xl'>Play Your Fun</h1>
                </div>
                <div className='relative w-full h-80 -my-4 max-w-sm md:my-2 lg:max-w-2xl lg:h-screen' style={{maxHeight: 520}}>
                    <Image src='/landing/guide-img.svg' layout='fill' className='object-cover object-center' alt='guide image' />
                </div>
                <div className='lg:w-2/5'>
                    <div className='text-left hidden lg:block mb-8'>
                        <p className='text-cust-purple tracking-widest font-semibold mb-2 lg:text-lg'>HOW TO</p>
                        <h1 className='text-2xl font-semibold lg:text-3xl'>Play Your Fun</h1>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {guide.map((item, index) => 
                            <div key={index} className='flex gap-4'>
                                <p className='bg-cust-yellow border-2 border-gray-800 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-xl'>{index + 1}</p>
                                <p className='text-sm leading-normal lg:text-base'>{item}</p>
                            </div>
                        )}
                    </div>
                    <div className='mt-8 flex justify-center lg:justify-start'>
                        <Link href='/explore'>
                            <Button variant='primary'>
                                Play Now!
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    );
}
 
export default Guide;