import Image from "next/image";
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
            <div className='w-full px-8 py-12 bg-more-light-purple rounded-2xl'>
                <div className='text-center'>
                    <p className='text-cust-purple tracking-widest font-semibold mb-2'>HOW TO</p>
                    <h1 className='text-2xl font-semibold'>Play Your Fun</h1>
                </div>
                <div className='relative w-full h-80 -my-4'>
                    <Image src='/landing/guide-img.svg' layout='fill' className='object-cover' />
                </div>
                <div className='flex flex-col gap-4'>
                    {guide.map((item, index) => 
                        <div key={index} className='flex gap-4'>
                            <p className='bg-cust-yellow border-2 border-gray-800 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-xl'>{index + 1}</p>
                            <p className='text-sm leading-normal'>{item}</p>
                        </div>
                    )}
                </div>
                <div className='mt-8 flex justify-center'>
                    <Button variant='primary'>
                        Play Now!
                    </Button>
                </div>
            </div>
        </Section>
    );
}
 
export default Guide;