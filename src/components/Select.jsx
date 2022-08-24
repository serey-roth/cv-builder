import React from 'react'

const Select = ({label, touched, error, ...props}) => {
	const selectClass = `border-2 rounded-md border-slate-300 p-[0.6em] w-full 
	focus-visible:ring focus:outline-none transtion ease-in-out 
	duration-300 ${props.disabled ? 'bg-slate-300' : ''} 
	 ${touched && error ? 'border-red-500' : ''}`

	return (
		<>
			<label className={`flex flex-col gap-1 grow relative 
			focus-within:text-indigo-400 
			${touched && error ? 'text-red-500' : ''}`}
			htmlFor={props.id || props.name}>
				<p>{label}</p>
				<select className={selectClass} {...props} />
			</label>
		</>
	)
}

export default Select