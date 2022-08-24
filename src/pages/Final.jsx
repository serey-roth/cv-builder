import React, { useRef } from 'react'
import { useCV } from '../contexts/cvContext';
import {
    MdOutlineEmail,
    MdOutlinePhoneAndroid
} from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print'
import Button from '../components/Button';

const Final = () => {
    const {cv, updateVisited } = useCV();

    const navigate = useNavigate();

    const componentRef = useRef();
    
	const handlePrint = useReactToPrint({ 
		content: () => componentRef.current 
	})

    const handleBack = () => {
        if (cv.educationList.length === 0) {
            navigate('/education');
        } else {
            navigate('/education/summary');
        }
    }

    updateVisited(useLocation().pathname);

    return (
        <div className='flex flex-col w-screen p-2 gap-3
            sm:w-[700px]'>
            <div className='flex flex-col rounded-lg 
            border-2 border-slate-300 shadow-slate-300
            text-[12px] sm:text-[16px]' 
            ref={componentRef}>
                <div className='bg-blue-500 rounded-t-lg 
                py-6 px-5 text-center text-white'>
                    <h1 className='text-xl sm:text-3xl mb-1 font-semibold text-white'>
                        {cv.info.firstName + ' ' + cv.info.lastName}
                    </h1>
                    {cv.info.profession ?
                        <h2 className='text-2xl mb-1 italic'>{cv.info.profession}</h2>
                        : null}
                    {cv.info.city ? <p className='text-md inline-flex pr-2'>
                    {cv.info.city}</p> : null}
                    {cv.info.state ? <p className='text-md inline-flex pr-2'>
                    {cv.info.state}</p> : null}
                    {cv.info.country ? <p className='text-md inline-flex pr-2'>
                    {cv.info.country}</p> : null}
                    {cv.info.zipcode ? <p className='text-md inline-flex pr-2'>
                    {cv.info.zipcode}</p> : null}
                    {cv.info.phone ?
                        <span className='mt-2 justify-center flex gap-2 items-center'>
                            <MdOutlinePhoneAndroid />
                            <a href={'tel:' + cv.info.phone}>{cv.info.phone}</a>
                        </span> : null
                    }
                    {cv.info.email ?
                        <span className='justify-center flex gap-2 items-center'>
                            <MdOutlineEmail className='mt-1' />
                            <a href={'mailto:' + cv.info.email} 
                            target='_blank' 
                            rel='noreferrer'>{cv.info.email}</a>
                        </span> : null
                    }
                </div>
                {cv.experienceList.length > 0 ?
                    <div className='flex flex-col px-4 sm:px-5 
                    py-3 my-2 sm:my-3'>
                        <h2 className='text-md sm:text-xl
                         font-semibold border-b-2
                        border-b-indigo-200'>
                            Work Experience
                        </h2>
                        <div className='flex flex-col gap-2'>
                            {cv.experienceList.map(e =>
                            <div key={e.toString()} className='mt-3'>
                                <div className='flex flex-row w-full'>
                                    <div className='flex flex-col self-stretch'>
                                        {e.currentlyWorking ?
                                            <p className='ml-1'>Present</p> : null}
                                        {e.endDate ?
                                            <p className='ml-1'>{e.endDate}</p> : null}
                                        {e.startDate ?
                                            <p className=''>{' - ' + e.startDate}</p> : null}    
                                    </div>
                                    <div className='flex flex-col grow px-5'>
                                        <p className='font-semibold grow text-lg'>{e.employer}</p>
                                        <p className='italic font-semibold'>{e.title}</p>
                                        <p>{e.description}</p>
                                    </div>
                                    <div className='flex self-stretch'>
                                        {e.city ?
                                            <p className=''>{e.city}</p> : null}
                                        {e.state ?
                                            <p className=''>{', ' + e.state}</p> : null}
                                        {e.country ?
                                            <p className=''>{', ' + e.country}</p> : null}
                                    </div>
                                </div>                                    
                            </div>)
                            }
                        </div>
                    </div> : null
                }
                {cv.educationList.length > 0 ?
                    <div className='flex flex-col px-4 
                    sm:px-5 py-3 my-2 sm:my-3'>
                        <h2 className='text-md sm:text-xl 
                        font-semibold border-b-2
                        border-b-indigo-200'>
                            Education
                        </h2>
                        <div className='flex flex-col w-full gap-2'>
                            {cv.educationList.map(e =>
                            <div key={e.toString()} className='mt-3'>
                                <div className='flex flex-row w-full'>
                                    <div className='flex flex-col self-stretch'>
                                        {e.currentlyAttending ?
                                            <p className='ml-1'>Present</p> : null}
                                        {e.endDate ?
                                            <p className='ml-1'>{e.endDate}</p> : null}
                                        {e.startDate ?
                                            <p className=''>{' - ' + e.startDate}</p> : null}    
                                    </div>
                                    <div className='flex flex-col grow px-5'>
                                        <p className='font-semibold grow'>{e.schoolName}</p>
                                        <div className='flex flex-row'>
                                            {e.degree ?
                                            <p className='italic'>{e.degree}</p> : null}
                                            {e.field ?
                                            <p className='inline-flex italic'>{', ' + e.field}</p> : null}
                                        </div>
                                        <p>{e.description}</p>
                                    </div>
                                    <div className='flex self-stretch'>
                                        {e.schoolLocation ?
                                        <p className=''>{e.schoolLocation}</p> : null}
                                    </div>
                                </div>                                    
                            </div>)
                            }
                        </div>
                    </div> : null
                }
            </div>
            <div className='flex justify-between'>
                <Button
                    label='Back'
                    type='button'
                    onClick={handleBack}/>
                <Button
                    label='Print'
                    type='button'
                    onClick={handlePrint}/>
            </div>
        </div>
    )
}

export default Final