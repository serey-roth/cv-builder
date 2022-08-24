import React from 'react'

const TextArea = ({label, touched, error, ...props}) => {
    const areaClass = `w-full h-[100px] border-2 rounded-lg border-slate-300
    p-2 focus-visible:ring focus:outline-none transtion ease-in-out 
	duration-300 resize-none overflow-auto`;

    return (
        <>
            <label className={`flex flex-col gap-1 grow relative 
            focus-within:text-indigo-400 
            ${touched && error ? 'text-red-500' : ''}`}>
                <p>{label}</p>
                <textarea className={areaClass} {...props}></textarea>
                {touched && error ? 
                    <p className='text-red-500'>{error}</p> : 
                    null
                }
            </label>
        </>
    )
}

export default TextArea