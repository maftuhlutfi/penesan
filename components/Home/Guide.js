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
            <div className='flex flex-col items-center w-full px-8 py-12 bg-more-light-purple rounded-2xl md:px-12 lg:flex-row lg:justify-between lg:rounded-3xl'>
                <div className='text-center lg:hidden'>
                    <p className='mb-2 font-semibold tracking-widest text-cust-purple lg:text-lg'>HOW TO</p>
                    <h1 className='text-2xl font-semibold lg:text-3xl'>Play Your Fun</h1>
                </div>
                <div className='relative w-[90%] my-16 h-96 lg:my-2 lg:max-w-[600px] lg:h-screen' style={{ maxHeight: 520 }}>
                    <Image src='/landing/guide-img.jpg' layout='fill' className='object-cover object-center rounded-[32px]' alt='guide image' />
                </div>
                <div className='lg:w-2/5'>
                    <div className='hidden mb-8 text-left lg:block'>
                        <p className='mb-2 font-semibold tracking-widest text-cust-purple lg:text-lg'>HOW TO</p>
                        <h1 className='text-2xl font-semibold lg:text-3xl'>Play Your Fun</h1>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {guide.map((item, index) =>
                            <div key={index} className='flex gap-4'>
                                <p className='flex items-center justify-center flex-shrink-0 w-10 h-10 text-xl border-2 border-gray-800 rounded-full bg-cust-yellow'>{index + 1}</p>
                                <p className='text-sm leading-normal lg:text-base'>{item}</p>
                            </div>
                        )}
                    </div>
                    <div className='flex justify-center mt-8 lg:justify-start'>
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