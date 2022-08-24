import React from 'react'

const CheckBox = ({children, ...props}) => {

	return (
		<>
			<label>
                <input type='checkbox' {...props} />
                {children}
            </label>
		</>
	)
}

export default CheckBox