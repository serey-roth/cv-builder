import React from 'react'
import {GrEdit, GrTrash} from 'react-icons/gr'

const BORDER_COLORS = 
['border-yellow-400', 
'border-blue-400', 
'border-orange-400'];

const Card = (props) => {
    return (
        <div className={`flex flex-col w-full border-2 
        border-l-[12px] z-10 px-4 py-2 gap-3
        ${BORDER_COLORS[props.index % 3]}`}>
            <div className='flex w-full flex-col'>
                <p className='hidden'>{props.index}</p>
                <p>{props.details}</p>
                {props.description !== '' ? 
                    <p>{props.description}</p> : 
                        null
                }
            </div>
            <div className='flex gap-2 self-end'>
                <button className='hover:ring transition 
                    duration-300 ease-in-out 
                    p-2 rounded-md hover:bg-slate-200' 
                    type='button'
                    onClick={props.onEdit}>
                    <GrEdit />
                </button>
                <button className='hover:ring transition 
                    duration-300 ease-in-out 
                    p-2 rounded-md hover:bg-slate-200' 
                    type='button'
                    onClick={props.onDelete}>
                    <GrTrash />
                </button>
            </div>
        </div>
    )
}

export default Card