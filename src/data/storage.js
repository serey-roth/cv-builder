import CV from './cv';
import Experience from './experience';
import Education from './education';

export const saveSessionData = (cv) => {
    sessionStorage.setItem('personalInfo', 
        JSON.stringify(cv.info.toJSONObject()));
    sessionStorage.setItem('experiences', 
        JSON.stringify(cv.experienceList.map(exp => exp.toJSONObject())));
    sessionStorage.setItem('education', 
        JSON.stringify(cv.educationList.map(edu => edu.toJSONObject())));
}

export const getSessionData = () => {
    const cv = new CV();
    let stored = sessionStorage.getItem('personalInfo');
    if (stored) {
        cv.updatePersonalInfo(JSON.parse(stored));
    } 
    stored = sessionStorage.getItem('experiences');
    if (stored) {
        const arr = JSON.parse(stored);
        arr.map(obj => {
            const exp = new Experience();
            exp.update(obj);
            cv.addExperience(exp);
            return '';
        })
    }
    stored = sessionStorage.getItem('education');
    if (stored) {
        const arr = JSON.parse(stored);
        arr.map(obj => {
            const edu = new Education();
            edu.update(obj);
            cv.addEducation(edu);
            return '';
        })
    }
    return cv;
}
