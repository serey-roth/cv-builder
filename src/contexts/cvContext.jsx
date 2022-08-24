import React, 
{ 
    createContext, 
    useContext, 
    useRef,
} from 'react'
import { parse, isDate } from "date-fns";

import Experience from '../data/experience'
import Education from '../data/education'
import { getSessionData, saveSessionData } from '../data/storage'

const CVContext = createContext({});

export const infoFormDefault = {
    firstName: '',
    lastName: '',
    profession: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phone: '',
    email: ''
}

export const experienceFormDefault = {
    title: '',
    employer: '',
    city: '',
    state: '',
    country: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: '',
};

export const educationFormDefault = {
    schoolName: '',
    schoolLocation: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    currentlyAttending: false,
    description: '',
};

export const CVContextProvider = ({children}) => {
    const cv = getSessionData();

    let val = sessionStorage.getItem('editedIndex');
    if (val) {
        val = Number.parseInt(val);
    } else {
        val = -1;
    }
    const editedIndex = useRef(val);

    val = sessionStorage.getItem('editedListName');
    if (!val) {
        val = '';
    } 
    const editedListName = useRef(val);

    const setEditedIndex = (index) => {
        editedIndex.current = index;
        sessionStorage.setItem('editedIndex', editedIndex.current);
    }

    const setEditedListName = (listName) => {
        editedListName.current = listName;
        sessionStorage.setItem('editedListName', editedListName.current);
    }

    const experienceInitialValues = useRef(experienceFormDefault);
    const educationInitialValues = useRef(educationFormDefault);

    const setExperienceFormInitialValues = () => {
        if (editedIndex.current !== -1 && 
            editedListName.current === 'experience') {
            experienceInitialValues.current = 
                cv.experienceList[editedIndex.current].toJSONObject();
        } else {
            experienceInitialValues.current = experienceFormDefault;
        }
    }
    
    const setEducationFormInitialValues = () => {
        if (editedIndex.current !== -1 && 
            editedListName.current === 'education') {
            educationInitialValues.current = 
                cv.educationList[editedIndex.current].toJSONObject();
        } else {
            educationInitialValues.current = educationFormDefault;
        }
    }

    const addUserInput = (values, listLabel) => {
        if (listLabel === 'personalInfo') {
            cv.updatePersonalInfo(values);
            saveSessionData(cv);
            return;
        }
        let test = Object.keys(values).every(key => 
            values[key] === '' || key === 'currentlyWorking'
            || key === 'currentlyAttending');
        if (test) {
            return;
        }
        let item;
        if (listLabel === 'experience') {
            item = new Experience();
        } else {
            item = new Education();
        }
        item.update(values);
        if (listLabel === 'experience') {
            if (editedIndex.current === -1) {
                cv.addExperience(item);
            } else {
                cv.updateExperience(editedIndex.current, item)
            }
        } else {
            if (editedIndex.current === -1) {
                cv.addEducation(item);
            } else {
                cv.updateEducation(editedIndex.current, item)
            }
        }
        cv.sortByDate();
        saveSessionData(cv);
    }

    const removeExperience = (index) => {
        cv.removeExperience(index);
        saveSessionData(cv);
    }

    const removeEducation = (index) => {
        cv.removeEducation(index);
        saveSessionData(cv);
    }

    const parseDate = (value, originalValue) => {
        const parsedDate = isDate(originalValue)
          ? originalValue
          : parse(originalValue, "yyyy-MM", new Date());
      
        return parsedDate;
    }

    const visitedPages = useRef([]);

    const updateVisited = (currentPage) => {
        if (visitedPages.current.includes(currentPage)) {
            return;
        } else {
            visitedPages.current.push(currentPage);
        }
    };

    return (
        <CVContext.Provider value={{
            cv,
            editedIndex, 
            setEditedIndex,
            setEditedListName,
            setExperienceFormInitialValues,
            setEducationFormInitialValues,
            experienceInitialValues,
            educationInitialValues,
            addUserInput,
            removeExperience,
            removeEducation,
            parseDate,
            visitedPages,
            updateVisited
        }}>
            {children}
        </CVContext.Provider>
    );
}

export const useCV = () => useContext(CVContext);