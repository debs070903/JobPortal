import React from 'react'
import { Badge } from './ui/badge'

export const LatestJobCards = ({job}) => {
  return (
    <div className='w-full flex flex-col gap-0 shadow-lg py-6 bg-[#EFF6FF] justify-center px-4 rounded-xl'>
        <div>
            <h2 className='w-full mt-2 text-lg text-[#1E3A8A] font-bold'>{job?.company?.name}</h2>
            <p className='w-full mt-2 text-gray-700 font-semibold'>{job?.location}</p>
        </div>
        <div>
            <h2 className='w-full mt-2 text-[#3B82F6] font-semibold'>{job?.title}</h2>
            <p className='w-full mt-2 italic text-gray-400 text-sm'>{job?.description}</p>
        </div>
        <div className='w-[50%] flex justify-between mt-4'>
            <Badge className='py-2 px-4 bg-[#3B82F6] hover:bg-[#3B82F6] hover:scale-105 transition ease-in-out duration-300'>{job?.openings} Positions</Badge>
            <Badge variant='outline' className='py-2 px-4 hover:scale-105 transition ease-in-out duration-300'>{job?.jobType}</Badge>
            <Badge className='py-2 px-4 bg-green-400 hover:bg-green-400 hover:scale-105 transition ease-in-out duration-300'>{job?.salary} LPA</Badge>
        </div>
    </div>
  )
}
