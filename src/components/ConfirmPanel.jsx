import React from 'react'
import { MdClose } from 'react-icons/md'

import Button from './Button'

const ConfirmPanel = (props) => {
    const panelClass = `flex flex-col gap-4 
    items-center p-5 w-[90%] sm:w-[500px]
    justify-center absolute 
    top-1/4 left-1/2 -translate-x-[50%] 
    rounded-lg border-2 
    bg-white border-slate-200
    ${props.visible ? '' : 'hidden'}`;

    return (
        <div className={panelClass}>
            <button onClick={props.onNo} type='button'
            className='absolute top-2 right-2 text-black
            self-end text-xl font-semibold hover:ring 
            hover:bg-slate-300 transition ease-in-out 
            duration-300 p-1 rounded-lg'><MdClose /></button>
           <h1 className='capitalize text-indigo-500 
           font-semibold'>
                {props.confirmHeading}
           </h1>
           <p className=''>
                {props.confirmPrompt}
           </p>
            <div className='flex gap-2 justify-around w-full'>
                <Button
                    label={props.yesLabel}
                    type='button'
                    onClick={props.onYes}
                />
                <Button
                    label={props.noLabel}
                    type='button'
                    onClick={props.onNo}
                />
            </div>
        </div>
    )
}

export default ConfirmPanel