import BlockContent from '@sanity/block-content-to-react'

const Explaination = ({ text }) => {
    return (
        <div className='text-center bg-white rounded-lg'>
            <h1 className='p-2 text-lg font-semibold text-text-primary'>Explaination</h1>
            <div className='p-4 text-sm leading-normal text-left text-gray-300 border-2 border-white rounded-b-lg lg:text-base bg-text-primary'>
                {text}
            </div>
        </div>
    );
}

export default Explaination;