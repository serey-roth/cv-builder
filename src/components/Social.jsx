import React from 'react'
import TextInput from './TextInput'

const Social = (props) => {
  return (
		<>
			{props.children}
			<TextInput 
			label=''
			name={props.name}
			type='text'
			/>
		</>
  )
}

export default Social