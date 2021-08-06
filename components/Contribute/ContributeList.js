import groq from "groq";
import { useEffect, useState } from "react";
import client from "../../client";
import Button from "../shared/Button";
import Spinner from "../shared/Spinner";
import ContributeItem from "./ContributeItem";

const ContributeList = () => {
    const [contributionList, setContributionList] = useState([])
    const [totalContributions, setTotalContributions] = useState(0)
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(true)

    const limit = 6

    useEffect(() => {
        const getTotalContribution = async () => {
            const res = await client.fetch(groq`
                count(*[_type == "contribution"])
            `)
            setTotalContributions(res)
        }
        getTotalContribution()
    }, [])

    useEffect(() => {
        const getContributionList = async () => {
            const res = await client.fetch(groq`
                *[_type == "contribution"] | order(_createdAt desc)[${offset}...${offset+limit}] {
                    ...,
                    "category": category->{title},
                    "user": user->{...}
                }
            `)
            setContributionList(prev => [...prev, ...res])
            setLoading(false)
        }
        getContributionList()
    }, [offset])

    const handleLoadMore = () => {
        setLoading(true)
        setOffset(prev => prev+limit)
    }

    return (
        <>
            <div className='flex flex-col gap-8 w-full mt-12 lg:hidden'>
                {contributionList.map((item, index) => <ContributeItem key={index} {...item} />)}
            </div>
            <div className='grid-cols-2 gap-8 hidden lg:grid mt-12'>
                <div className='flex flex-col w-full gap-8'>
                    {contributionList.filter((item, index) => index % 2 == 0).map((item, index) => <ContributeItem key={index} {...item} />)}
                </div>
                <div className='flex flex-col w-full gap-8'>
                    {contributionList.filter((item, index) => index % 2 == 1).map((item, index) => <ContributeItem key={index} {...item} />)}
                </div>
            </div>
            {loading && 
                <div className='mt-12'>
                    <Spinner width='32px' purple />
                </div>
            }
            {contributionList.length < totalContributions  && 
                <div className='flex w-full justify-center mt-12'>
                    <Button variant='secondary' onClick={handleLoadMore}>
                        Load more
                    </Button>
                </div>
            }
        </>
    );
}
 
export default ContributeList;