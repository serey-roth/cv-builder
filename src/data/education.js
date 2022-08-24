class Education {
    constructor() {
        this.eduSchoolName = '';
        this.eduSchoolLocation = '';
        this.eduDegree = '';
        this.eduField = '';
        this.eduStartDate = '';
        this.eduEndDate = '';
        this.isAttending = false;
        this.eduDescription = '';
    }

    get schoolName() { return this.eduSchoolName; }
    get schoolLocation() { return this.eduSchoolLocation; }
    get degree() { return this.eduDegree; }
    get field() { return this.eduField; }
    get startDate() { return this.eduStartDate; }
    get endDate() { return this.eduEndDate; }
    get currentlyAttending() { return this.isAttending; }
    get description() { return this.eduDescription }

    set schoolName(newData) { this.eduSchoolName = newData; }
    set schoolLocation(newData) { this.eduSchoolLocation = newData; }
    set degree(newData) { this.eduDegree = newData; }
    set field(newData) { this.eduField = newData; }
    set startDate(newData) { this.eduStartDate = newData; }
    set endDate(newData) { this.eduEndDate = newData; }
    set currentlyAttending(newData) { this.isAttending = newData; }
    set description(newData) { this.eduDescription = newData; }

    update(obj) {
        this.eduSchoolName = obj.schoolName;
        this.eduSchoolLocation = obj.schoolLocation;
        this.eduDegree = obj.degree;
        this.eduField = obj.field;
        this.eduStartDate = obj.startDate;
        this.eduEndDate = obj.endDate;
        this.isAttending = obj.currentlyAttending;
        this.eduDescription = obj.description;
    }
    equals(obj) {
        if (!(obj instanceof Education)) {
            return false;
        }
        return this.eduSchoolName === obj.schoolName &&
        this.eduSchoolLocation === obj.schoolLocation &&
        this.eduDegree === obj.degree &&
        this.eduField === obj.field &&
        this.eduStartDate === obj.startDate &&
        this.eduEndDate === obj.endDate &&
        this.isAttending === obj.currentlyAttending &&
        this.eduDescription === obj.description;
    }
    toJSONObject() {
        return {
            "schoolName": this.eduSchoolName,
            "schoolLocation": this.eduSchoolLocation,
            "degree": this.eduDegree,
            "field": this.eduField,
            "startDate": this.eduStartDate,
            "endDate": this.eduEndDate,
            "currentlyAttending": this.isAttending,
            "description": this.eduDescription
        };
    }
    toString() {
        let str = `${this.eduSchoolName}`;
        if (this.eduSchoolLocation !== '') { 
            str += ' | ' + this.eduSchoolLocation; 
        }
        if (this.eduDegree !== '') { str += ' | ' + this.eduDegree; }
        if (this.eduField !== '') { str += ' | ' + this.eduField; }
        if (this.isAttending) { str += ' | Current'; }
        if (this.eduEndDate !== '') { str +=  ' | ' + this.endDate; }
        if (this.eduStartDate !== '') { str += ' - ' + this.eduStartDate; }
        return str;
    }
}

export default Education