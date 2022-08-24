import React, { useState } from 'react';
import {
  Formik
} from 'formik';
import * as Yup from 'yup';

import { useNavigate, useLocation } from 'react-router-dom';

import TextInput from '../components/TextInput';
import CheckBox from '../components/CheckBox';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import ConfirmPanel from '../components/ConfirmPanel';

import { experienceFormDefault, useCV } from '../contexts/cvContext';

const dayjs = require('dayjs');

const ExperienceForm = () => {
	const [
		confirmPanelVisible, 
		setConfirmPanelVisible
	] = useState(false);

	const {
		cv,
		experienceInitialValues,
		setExperienceFormInitialValues,
		addUserInput,
		parseDate,
		setEditedIndex,
        setEditedListName,
		updateVisited
	} = useCV();

	updateVisited(useLocation().pathname);

	const navigate = useNavigate();

	const previousPage = () => {
		if (cv.experienceList.length === 0) {
			navigate('/');
		} else {
			navigate('/experience/summary');
		}
	}

	const nextPage = (values) => {
		if (cv.experienceList.length !== 0) {
			navigate('/experience/summary');
			return;
		}
		let test = Object.keys(values).every(key => 
		values[key] === '' || key === 'currentlyWorking');
		if (test) {
			if (cv.educationList.length === 0) {
				navigate('/education');
			} else {
				navigate('/education/summary');
			}
		} else {
			navigate('/experiences/summary');
		}
	}

	const validation = Yup.object({
		title: Yup.string()
		.test(
			'isEntered',
			'Must enter a job title',
			(value, testContext) => {
				return value !== undefined || 
				(testContext.parent.employer === undefined &&
				testContext.parent.city  === undefined && 
				testContext.parent.state === undefined &&
				testContext.parent.country === undefined &&
				testContext.parent.startDate === undefined &&
				testContext.parent.endDate === undefined)
			}
		),
		employer: Yup.string()
		.test(
			'isEntered',
			'Must enter an employer',
			(value, testContext) => {
				const test =  value !== undefined || 
				(testContext.parent.title === undefined  &&
				testContext.parent.city === undefined && 
				testContext.parent.state === undefined  &&
				testContext.parent.country === undefined  &&
				testContext.parent.startDate === undefined  &&
				testContext.parent.endDate === undefined) 
				return test;
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
			"Must enter an end date if you're not currently employed here",
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

	setExperienceFormInitialValues();

  	return (
		<>
			<Formik
				initialValues={experienceInitialValues.current}
				validationSchema={validation}
				onSubmit={(values) => {
					addUserInput(values, 'experience');
					nextPage(values);
					setEditedIndex(-1);
					setEditedListName('');
					sessionStorage.removeItem('experienceFormInitialVal');
				}}
			>
			{(formik) => (
				<form
					className='flex flex-col p-4 
					gap-4 w-screen sm:w-[700px]' 
					onSubmit={formik.handleSubmit}
				>
					<h1 className='capitalize text-xl font-semibold text-indigo-400'>
					Tell us about your work experience...</h1>
					<div className='flex gap-3'>
						<TextInput
						label='Job Title' 
						touched={formik.touched.title}
						error={formik.errors.title}
						disabled={false}
						name='title' 
						id='title'
						type='text' 
						placeholder='e.g. Sales Representative' 
						{...formik.getFieldProps('title')}/>

						<TextInput
						label='Employer' 
						touched={formik.touched.employer}
						error={formik.errors.employer}
						disabled={false}
						name='employer' 
						id='employer'
						type='text' 
						placeholder='e.g. ABC Corporation' 
						{...formik.getFieldProps('employer')}/>
					</div>

					<div className='flex flex-col sm:flex-row gap-3'>
						<TextInput
						label='City' 
						touched={formik.touched.city}
						error={formik.errors.city}
						disabled={false}
						name='city' 
						id='city'
						type='text' 
						placeholder='e.g. Seattle'
						{...formik.getFieldProps('city')}/>

						<TextInput
						label='State/Province' 
						touched={formik.touched.state}
						error={formik.errors.state}
						disabled={false}
						name='state' 
						id='state'
						type='text' 
						placeholder='e.g. Washington'
						{...formik.getFieldProps('state')}/>

						<TextInput
						label='Country' 
						touched={formik.touched.country}
						error={formik.errors.country}
						disabled={false}
						name='country' 
						id='country'
						type='text' 
						placeholder='e.g. United States of America'
						{...formik.getFieldProps('country')}/>
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
						disabled={formik.values.currentlyWorking}
						name='endDate' 
						id='endDate'
						type='month'
						{...formik.getFieldProps('endDate')}/>
					</div>

					<CheckBox 
						name='currentlyWorking'
						id='currentlyWorking'
						className='relative top-[1.5px] mr-2'
						checked={formik.values.currentlyWorking}
						value={formik.values.currentlyWorking}
						onChange={(e) => {
							formik.setFieldValue('endDate', '')
							formik.handleChange(e);
						}}
						onBlur={(e) => {
							formik.setFieldValue('endDate', '')
							formik.handleChange(e);
						}}>
						I currently work here
					</CheckBox>

					<TextArea 
						label='Job Description'
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
									values: experienceFormDefault,
								})
							}}
						/>
						{cv.experienceList.length === 0 &&
						formik.values === experienceFormDefault ? 
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
					
					{cv.experienceList.length === 0 &&
					formik.values === experienceFormDefault ?
						<ConfirmPanel 
							noLabel='Ok'
							yesLabel="I don't have any work experience"
							confirmHeading='More information needed'
							confirmPrompt={`Looks like you haven't entered your ` + 
							`work experience. We suggest you at least ` +
							`enter your Job Title` +
							` and Employer.`}
							onNo={() =>
							setConfirmPanelVisible(prevState => !prevState)}
							onYes={formik.handleSubmit}
							visible={confirmPanelVisible}
						/> : null
					}
				</form>
			)}
			</Formik>
		</>
	);
}

export default ExperienceForm