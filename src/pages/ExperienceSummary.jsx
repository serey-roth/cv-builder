import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Card from '../components/Card'
import Button from '../components/Button'

import { useCV } from '../contexts/cvContext'

const ExperienceSummary = () => {
    const { 
        cv,
        setEditedIndex,
        setEditedListName,
        removeExperience,
        updateVisited
    } = useCV();

    cv.sortByDate();
    
    updateVisited(useLocation().pathname);

    const navigate = useNavigate();

    const handleNext = () => {
		if (cv.educationList.length === 0) {
			navigate('/education')
		} else {
			navigate('/education/summary')
		}
	}

	const handleAdd = () => {
        setEditedIndex(-1);
		navigate('/experience')
	}

	const handleEdit = (e) => {
		const index = Number.parseInt(e.currentTarget.parentNode
		.parentNode.childNodes[0].childNodes[0].textContent);
        setEditedIndex(index);
        setEditedListName('experience');
		navigate('/experience')
	}

    const handleDelete = (e) => {
        const index = Number.parseInt(e.currentTarget.parentNode
            .parentNode.childNodes[0].childNodes[0].textContent);
        removeExperience(index);
        if (cv.experienceList.length === 0) {
            navigate('/experience');
        } else {
            navigate('/experience/summary');
        }
    }
    
    return (
        <div className='flex flex-col w-screen p-2 gap-3
        sm:w-[700px]'>
            <h1 className='capitalize underline text-left ml-2
            text-xl font-semibold text-indigo-400'>
				Work History</h1>
            <div className='flex flex-col w-full p-2 gap-4 max-h-[400px] 
            overflow-auto'>
                {cv.experienceList.map((i, index) => 
                    <Card key={i.toString()} 
                    index={index}
                    details={i.toString()} 
                    description={i.description}
                    onEdit={handleEdit} 
                    onDelete={handleDelete} />)
                }
            </div>
            <button type='button'
            className='w-2/3 py-2 self-center border-2 rounded-lg
            bg-slate-100 border-dashed border-slate-300 capitalize 
            hover:ring transition
		    ease-in-out duration-300'
            onClick={handleAdd}>
                Add another position
            </button>
            <div className='w-full flex justify-between'>
				<Button
					label='Back'
					type='button'
					onClick={() => navigate('/')}/>
				<Button 
					type='button'
					label='Next'
                    onClick={handleNext} />
			</div>
        </div>
    )
}

export default ExperienceSummary