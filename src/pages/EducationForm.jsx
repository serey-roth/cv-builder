import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom'

import TextInput from '../components/TextInput';
import CheckBox from '../components/CheckBox';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button';
import ConfirmPanel from '../components/ConfirmPanel';

import { educationFormDefault, useCV } from '../contexts/cvContext';

import data from '../data/formData.json';

const dayjs = require('dayjs');

const EducationForm = () => {
	const [
		confirmPanelVisible, 
		setConfirmPanelVisible
	] = useState(false);

	const {
		cv, 
		educationInitialValues,
		setEducationFormInitialValues,
		addUserInput,
		parseDate,
		setEditedIndex,
        setEditedListName,
		updateVisited
	} = useCV();

	updateVisited(useLocation().pathname);

	const navigate = useNavigate();

	const previousPage = () => {
		if (cv.educationList.length === 0) {
			if (cv.experienceList.length > 0) {
				navigate('/experience/summary')
			} else {
				navigate('/experience');
			}
		} else {
			navigate('/education/summary');
		}
	}

	const nextPage = (values) => {
		if (cv.educationList.length !== 0) {
			navigate('/education/summary');
			return;
		}
		let test = Object.keys(values).every(key => 
		values[key] === '' || key === 'currentlyAttending');
		if (test) {
			navigate('/resume')
		} else {
			navigate('/education/summary');
		}
	}
	
	const validation = Yup.object({
		schoolName: Yup.string()
		.test(
			'isEntered',
			'Must enter a school name',
			(value, testContext) => {
				return value !== undefined || 
				(testContext.parent.schoolLocation === undefined &&
				testContext.parent.degree  === undefined && 
				testContext.parent.field === undefined &&
				testContext.parent.startDate === undefined &&
				testContext.parent.endDate === undefined)
			}
		),
		startDate: Yup.date()
		.transform(parseDate)
		.max(new Date(), "Can't be after today's date")
		.test(
		'isEntered',
		'Must enter a start date',
		(value, testContext) => {
			const test =  value !== undefined || 
			testContext.parent.endDate === undefined;
			return test;
		}
		),
		endDate: Yup.date()
		.transform(parseDate)
		.test(
		'isEntered',
		"Must enter an end date if you completed your degree",
		(value, testContext) => {
			if (testContext.parent.currentlyWorking) {
				return true;
			}
			const test =  value !== undefined || 
			testContext.parent.startDate === undefined;
			return test;
		}
		)
		.test(
		'isValid',
		"Must be after start date",
		(value, testContext) => {
			if (testContext.parent.startDate !== undefined &&
				value !== undefined && 
				dayjs(testContext.parent.startDate)
				.isAfter(dayjs(value))) {
					return false;
			}
			return true;
		}
		)
	})

	setEducationFormInitialValues();

	return (
		<>
			<Formik
				initialValues={educationInitialValues.current}
				validationSchema={validation}
				onSubmit={(values) => {
					addUserInput(values, 'education');
					nextPage(values);
					setEditedIndex(-1);
					setEditedListName('');
					sessionStorage.removeItem('educationFormInitialVal');
				}}
			>
			{(formik) => (
				<form
					className='flex flex-col p-4 gap-4 w-screen sm:w-[700px]' 
					onSubmit={formik.handleSubmit}
				>
					<h1 className='capitalize text-xl font-semibold text-indigo-400'>
					Tell us about your education...</h1>
					<div className='flex gap-3'>
						<TextInput
						label='School Name' 
						touched={formik.touched.schoolName}
						error={formik.errors.schoolName}
						disabled={false}
						name='schoolName' 
						id='schoolName'
						type='text' 
						placeholder='e.g. Seattle University' 
						{...formik.getFieldProps('schoolName')}/>

						<TextInput
						label='School Location' 
						touched={formik.touched.schoolLocation}
						error={formik.errors.schoolLocation}
						disabled={false}
						name='schoolLocation' 
						id='schoolLocation'
						type='text' 
						placeholder='e.g. Seattle' 
						{...formik.getFieldProps('schoolLocation')}/>
					</div>

					<div className='flex flex-col sm:flex-row gap-3'>
						<Select
							label='Degree' 
							touched={formik.touched.degree}
							error={formik.errors.degree}
							disabled={false}
							name='degree' 
							id='degree'
							type='text' 
							placeholder='e.g. Seattle'
							{...formik.getFieldProps('degree')}
						>
							<option value='Select'>Select</option>
							{data.degreeOptions.map(deg => 
								<option key={deg} value={deg}>{deg}</option>
							)}
						</Select>

						<TextInput
						label='Field of Study' 
						touched={formik.touched.field}
						error={formik.errors.field}
						disabled={formik.values.degree === 'High School Diploma' 
						|| formik.values.degree === 'GED'}
						name='field' 
						id='field'
						type='text' 
						placeholder='e.g. Computer Science'
						{...formik.getFieldProps('field')}/>

					</div>

					<div className='flex flex-col sm:flex-row gap-3'>
						<TextInput
						label='Start Date' 
						touched={formik.touched.startDate}
						error={formik.errors.startDate}
						disabled={false}
						name='startDate' 
						id='startDate'
						type='month'
						{...formik.getFieldProps('startDate')}/>

						<TextInput
						label='End Date' 
						touched={formik.touched.endDate}
						error={formik.errors.endDate}
						disabled={formik.values.currentlyAttending}
						name='endDate' 
						id='endDate'
						type='month'
						{...formik.getFieldProps('endDate')}/>
					</div>

					<CheckBox 
						name='currentlyAttending'
						id='currentlyAttending'
						className='relative top-[1.5px] mr-2'
						value={formik.values.currentlyAttending}
						checked={formik.values.currentlyAttending}
						onChange={(e) => {
							formik.setFieldValue('endDate', '')
							formik.handleChange(e);
						}}
						onBlur={(e) => {
							formik.setFieldValue('endDate', '')
							formik.handleChange(e);
						}}>
						I currently attend here
					</CheckBox>

					<TextArea 
						label='Description'
						touched={formik.touched.description}
						error={formik.errors.description}
						name='description'
						id='description'
						{...formik.getFieldProps('description')}
					/>
					
					<div className='w-full flex justify-between'>
						<Button
						label='Back'
						type='button'
						onClick={previousPage}
						/>
						<Button
							label='Clear'
							type='reset' 
							onClick={() => {
								formik.resetForm({
									values: educationFormDefault,
								})
							}}
						/>
						{cv.educationList.length === 0 &&
						formik.values === educationFormDefault ? 
							<Button 
							label='Next'
							type='button' 
							onClick={() => 
							setConfirmPanelVisible(prevState => !prevState)}
							/> :
							<Button 
							label='Next'
							type='submit'
							/>
						}
					</div>

					{cv.educationList.length === 0 && 
					formik.values === educationFormDefault ?
						<ConfirmPanel 
							noLabel='Ok'
							yesLabel="I don't have any degree"
							confirmHeading='More information needed'
							confirmPrompt={
							`Looks like you haven't entered your ` + 
							`degree. We suggest you at least ` + 
							`enter your School Name.`}
							onNo={()=> 
							setConfirmPanelVisible(prevState => !prevState)}
							onYes={formik.handleSubmit}
							visible={confirmPanelVisible}
						/> : null
					}
				</form>
			)}
			</Formik>
		</>
	)
}

export default EducationForm