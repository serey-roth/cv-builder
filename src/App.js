import { useState } from 'react'
import {
	Routes,
	Route,
	useLocation
} from 'react-router-dom'

import PersonalInfoForm from './pages/PersonalInfoForm'
import EducationForm from './pages/EducationForm'
import ExperienceForm from './pages/ExperienceForm'
import ExperienceSummary from './pages/ExperienceSummary'
import EducationSummary from './pages/EducationSummary'
import Final from './pages/Final'

import CV from './components/CV'
import Pagination from './components/Pagination'
import Button from './components/Button'

function App() {
	const currentPage = useLocation().pathname;

	const [visibleCV, setVisibleCV] = useState(false);

	return (
		<div className='flex flex-col items-center 
		justify-center min-h-screen w-screen'>
			<div className='flex flex-col w-full sm:w-[700px]
			items-center gap-2'>
				<Button 
				label='Preview'
				addOnClasses={'self-end ' +
				(currentPage === '/resume' ? 'hidden': '')}
				onClick={() => setVisibleCV(prevState => !prevState)} />
				<div className='flex flex-col items-center relative'>
					<Routes>
						<Route path='/' 
							element={<PersonalInfoForm />} />
						<Route path='/experience' 
							element={<ExperienceForm />} />
						<Route path='/experience/summary' 
							element={
								<ExperienceSummary />
							} />
						<Route path='/education' 
							element={<EducationForm />} />
						<Route path='/education/summary' 
							element={
								<EducationSummary />
							} />
						<Route path='/resume' 
							element={
								<Final />
							} />
					</Routes>
				</div>
				<Pagination />
			</div>
			<CV onClose={() =>
			setVisibleCV(prevState => !prevState)}
			visible={visibleCV}/>
		</div>
	);
}

export default App;
