import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";
import Section from "../shared/Section";

const Contribute = () => {
    return (
        <Section>
            <div>
                <div className='relative w-full h-96 bg-more-light-purple rounded-2xl'>
                    <Image src='/landing/contribute-img.svg' layout='fill' className='object-fit object-center' />
                </div>
                <div className='mt-8'>
                    <h1 className='text-2xl font-bold mb-2'>You Got a Better Idea?</h1>
                    <p className='text-text-secondary mb-6'>Share your ideas and challenge the others.</p>
                    <Link href='/contribute'>
                        <Button variant='primary'>
                            Contribute!
                        </Button>
                    </Link>
                </div>
            </div>
        </Section>
    );
}
 
export default Contribute;