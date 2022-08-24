import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Card from '../components/Card'
import Button from '../components/Button'

import { useCV } from '../contexts/cvContext'

const EducationSummary = () => {
    const { 
        cv,
        setEditedIndex,
        setEditedListName,
        removeEducation,
        updateVisited
    } = useCV();

    updateVisited(useLocation().pathname);

    const navigate = useNavigate();

    const handleAdd = () => {
        setEditedIndex(-1);
		navigate('/education')
	}

	const handleBack = () => {
		if (cv.experienceList.length === 0) {
			navigate('/experience')
		} else {
			navigate('/experience/summary')
		}
	}

    const handleEdit = (e) => {
		const index = Number.parseInt(e.currentTarget.parentNode
        .parentNode.childNodes[0].childNodes[0].textContent)
		setEditedIndex(index);
        setEditedListName('education');
		navigate('/education')
	}

    const handleDelete = (e) => {
        const index = Number.parseInt(e.currentTarget.parentNode
            .parentNode.childNodes[0].childNodes[0].textContent);
        removeEducation(index);
        if (cv.educationList.length === 0) {
            navigate('/education');
        } else {
            navigate('/education/summary');
        }
    }

    return (
        <div className='flex flex-col w-screen p-2 gap-3
        sm:w-[700px]'>
            <h1 className='capitalize underline text-left ml-2
            text-xl font-semibold text-indigo-400'>
                Education Summary</h1>
            <div className='flex flex-col w-full p-2 gap-4 max-h-[400px] 
            overflow-auto'>
                {cv.educationList.map((i, index) => 
                    <Card key={i.toString()} 
                    index={index}
                    details={i.toString()} 
                    description={i.description}
                    onEdit={handleEdit} 
                    onDelete={handleDelete} />)
                }
            </div>
            <button type='button'
            className='w-2/3 py-2 self-center  capitalize 
            border-dashed border-2 rounded-lg
            bg-slate-100 hover:ring transition
		    ease-in-out border-slate-300 duration-300'
            onClick={handleAdd}>
                Add another degree
            </button>
            <div className='w-full flex justify-between'>
				<Button
					label='Back'
					type='button'
					onClick={handleBack}/>
				<Button 
                    label='Next'
					type='button'
                    onClick={() => navigate('/resume')} />
			</div>
        </div>
    )
}

export default EducationSummary