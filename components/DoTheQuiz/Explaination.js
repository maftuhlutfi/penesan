import BlockContent from '@sanity/block-content-to-react'

const Explaination = ({text}) => {
    return (
        <div className='text-center bg-white rounded-lg'>
            <h1 className='text-text-primary text-lg font-semibold p-2'>Explaination</h1>
            <div className='leading-normal text-gray-300 text-sm lg:text-base text-left bg-text-primary p-4 border-2 border-white rounded-b-lg'>
                <BlockContent blocks={text} />
            </div>
        </div>
    );
}
 
export default Explaination;