import React from 'react'
import {
    Formik,
} from 'formik'
import * as Yup from 'yup';
import {
	useNavigate,
	useLocation,
} from 'react-router-dom'

import TextInput from '../components/TextInput';
import Button from '../components/Button';

import { infoFormDefault, useCV } from '../contexts/cvContext'

const PersonalInfoForm = () => {
	const { cv, addUserInput, updateVisited } = useCV();

	const navigate = useNavigate();

	updateVisited(useLocation().pathname);

	const nextPage = () => {
		if (cv.experienceList.length === 0) {
			navigate('/experience')
		} else {
			navigate('/experience/summary');
		}
	}

	return (
		<>
			<Formik
				initialValues={cv.info.toJSONObject()}
				validationSchema={Yup.object({
					firstName: Yup.string()
					.required("Required"),
					lastName: Yup.string()
					.required("Required"),
					zipcode: Yup.string()
					.min(5, 'Must be 5 digits')
					.max(5, 'Must be 5 digits'),
					phone: Yup.string()
					.min(10, 'Must be 10 digits')
					.max(10, 'Must be 10 digits'),
					email: Yup.string()
					.email('Invalid email address')
					.required('Required'),
				})}
				onSubmit={(values) => {
					addUserInput(values, 'personalInfo');
					nextPage();
				}}
			>
			{(formik) => (
				<form 
					className='flex flex-col p-4 gap-4 w-screen sm:w-[700px]'
					onSubmit={formik.handleSubmit}
				>
					<h1 className='capitalize text-xl font-semibold text-indigo-400'>
					Tell us about yourself...</h1>
					<div className='flex gap-3'>
						<TextInput 
						label='First Name' 
						touched={formik.touched.firstName}
						error={formik.errors.firstName}
						disabled={false}
						name='firstName' 
						type='text' 
						placeholder='e.g. John'
						{...formik.getFieldProps('firstName')}/>

						<TextInput 
						label='Last Name'
						touched={formik.touched.lastName}
						error={formik.errors.lastName}
						disabled={false}
						name='lastName' 
						type='text' 
						placeholder='e.g. Doe'
						{...formik.getFieldProps('lastName')}/>
					</div>

					<TextInput 
					label='Profession'
					touched={formik.touched.profession}
					error={formik.errors.profession}
					disabled={false} 
					name='profession' 
					type='text' 
					placeholder='e.g. Junior Web Developer'
					{...formik.getFieldProps('profession')}/>

					<div className='flex flex-col sm:flex-row gap-3'>
						<TextInput 
						label='City'
						touched={formik.touched.city}
						error={formik.errors.city}
						disabled={false} 
						name='city' 
						type='text' 
						placeholder='e.g. Seattle'
						{...formik.getFieldProps('city')}/>

						<TextInput 
						label='State/Province'
						touched={formik.touched.state}
						error={formik.errors.state}
						disabled={false} 
						name='state' 
						type='text' 
						placeholder='e.g. Washington'
						{...formik.getFieldProps('state')}/>
					</div>

					<div className='flex flex-col sm:flex-row gap-3'>
						<TextInput 
						label='Country'
						touched={formik.touched.country}
						error={formik.errors.country}
						disabled={false} 
						name='country' 
						type='text' 
						placeholder='e.g. United States of America'
						{...formik.getFieldProps('country')}/>

						<TextInput 
						label='Zip Code'
						touched={formik.touched.zipcode}
						error={formik.errors.zipcode}
						disabled={false} 
						name='zipcode' 
						type='number' 
						placeholder='e.g. 94102'
						{...formik.getFieldProps('zipcode')}/>
					</div>
					
					<div className='flex flex-col sm:flex-row gap-3'>
						<TextInput
						label='Phone'
						touched={formik.touched.phone}
						error={formik.errors.phone}
						disabled={false} 
						name='phone' 
						type='number' 
						placeholder='e.g. 4155551212'
						{...formik.getFieldProps('phone')}/>

						<TextInput 
						label='Email'
						touched={formik.touched.email}
						error={formik.errors.email}
						disabled={false} 
						name='email' 
						type='email' 
						placeholder='e.g. jonedoe@gmail.com'
						{...formik.getFieldProps('email')}/>
					</div>

					<div className='flex justify-between'>
						<Button
							label='Clear'
							type='reset' 
							onClick={() => {
								formik.resetForm({
									values: infoFormDefault,
								})
							}}
						/>
						<Button 
							label='Next'
							type='submit' /> 
					</div>
				</form>
			)}
			</Formik>
		</>
	)
}

export default PersonalInfoForm;