import PersonalInfo from './personalInfo'

const dayjs = require('dayjs');

class CV {
    constructor() {
        this.personalInfo = new PersonalInfo();
        this.experiences = [];
        this.education = [];
    }

    get info() { return this.personalInfo; }
    get experienceList () { return this.experiences; }
    get educationList() { return this.education; }

    updatePersonalInfo(newInfo) {
        this.personalInfo.update(newInfo);
    }
    addExperience(newExper) {
        const index = this.indexOf(this.experiences, newExper);
        if (index === -1) {
            this.experiences.push(newExper);
        } 
    }
    updateExperience(index, newItem) {
        this.experiences[index].update(newItem);
    }
    updateEducation(index, newItem) {
        this.education[index].update(newItem);
    }
    removeExperience(index) {
        this.experiences = this.experiences.filter((e, ind) => 
            ind !== index);
    }
    addEducation(newEdu) {
        const index = this.indexOf(this.education, newEdu);
        if (index === -1) {
            this.education.push(newEdu);
        }
    }
    removeEducation(index) {
        this.education = this.education.filter((e, ind) => 
            ind !== index);
    }
    indexOf(list, item) {
        return list.findIndex(i => i.equals(item))
    }
    sortByDate() {
        chronologicalSort(this.experienceList);
        chronologicalSort(this.educationList);
    }
}

function chronologicalSort(list) {
    list.sort(function(item1, item2) {
        if (item1.endDate === '' && item2.endDate === '') {
            return dayjs(item1.startDate).isBefore(item2.startDate) ?
            1 : (dayjs(item1.startDate).isSame(dayjs(item2.startDate)) ? 
            0 : -1);
        } else if (item1.endDate === '') {
            return -1;
        } else if (item2.endDate === '') {
            return 1;
        } else {
            return dayjs(item1.startDate).isBefore(item2.endDate) ?
            1 : (dayjs(item1.startDate).isSame(dayjs(item2.endDate)) ? 
            0 : -1);
        }
    })
}

export default CV;