import React from 'react'
//import { ImCheckmark, ImCross } from 'react-icons/im'

const TextInput = ({label, touched, error, ...props}) => {
	const inputClass = `border-2 rounded-md border-slate-300 p-2 w-full 
	focus-visible:ring focus:outline-none transtion ease-in-out 
	duration-300 ${props.disabled ? 'bg-slate-300' : ''} 
	 ${touched && error ? 'border-red-500' : ''}`

	return (
		<>
			<label className={`flex flex-col gap-1 grow relative 
			focus-within:text-indigo-400 
			${touched && error ? 'text-red-500' : ''}`}>
				<p>{label}</p>
				<input className={inputClass} {...props}/>
				{touched && error ? 
					<p className='text-red-500'>{error}</p> : 
					null
				}
			</label>
		</>
	);
}

export default TextInput