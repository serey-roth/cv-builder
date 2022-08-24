import React from 'react'

const Button = ({label, addOnClasses='', ...props}) => {
	const buttonClass = `rounded-lg px-5 py-3 mt-3
	hover:bg-indigo-100 hover:ring transition
	ease-in-out duration-300 ${addOnClasses}`
	return (
		<button className={buttonClass} {...props}>
			{label}
		</button>
	)
}

export default Button