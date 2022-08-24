class Experience {
    constructor() {
        this.expTitle = '';
        this.expEmployer = '';
        this.expCity = '';
        this.expState = '';
        this.expCountry = '';
        this.expStartDate = '';
        this.expEndDate = '';
        this.isWorking = false;
        this.expDescription = '';
    }

    get title() { return this.expTitle; }
    get employer() { return this.expEmployer; }
    get city() { return this.expCity; }
    get state() { return this.expState; }
    get country() { return this.expCountry; }
    get startDate() { return this.expStartDate; }
    get endDate() { return this.expEndDate; }
    get currentlyWorking() { return this.isWorking; }
    get description() { return this.expDescription; }

    set title(newData) { this.expTitle = newData; }
    set employer(newData) { this.expEmployer = newData; }
    set city(newData) { this.expCity = newData; }
    set state(newData) { this.expState = newData; }
    set country(newData) { this.expCountry = newData; }
    set startDate(newData) { this.expStartDate = newData; }
    set endDate(newData) { this.expEndDate = newData; }
    set currentlyWorking(newData) { this.isWorking = newData; }
    set description(newData) { this.expDescription = newData; }

    update(obj) {
        this.expTitle = obj.title;
        this.expEmployer = obj.employer;
        this.expCity = obj.city;
        this.expState = obj.state;
        this.expCountry = obj.country;
        this.expStartDate = obj.startDate;
        this.expEndDate = obj.endDate;
        this.isWorking = obj.currentlyWorking;
        this.expDescription = obj.description;
    }
    equals(obj) {
        if (!(obj instanceof Experience)) {
            return false;
        }
        return this.expTitle === obj.title &&
        this.expEmployer === obj.employer &&
        this.expCity === obj.city &&
        this.expState === obj.state &&
        this.expCountry === obj.country &&
        this.expStartDate === obj.startDate &&
        this.expEndDate === obj.endDate &&
        this.isWorking === obj.currentlyWorking &&
        this.expDescription === obj.description ;
    }
    toJSONObject() {
        return {
            "title": this.expTitle,
            "employer": this.expEmployer,
            "city": this.expCity,
            "state": this.expState,
            "country": this.expCountry,
            "startDate": this.expStartDate,
            "endDate": this.expEndDate,
            "currentlyWorking": this.isWorking,
            "description": this.expDescription
        };
    }
    toString() {
        let str = `${this.expTitle} | ${this.expEmployer}`;
        if (this.expCity !== '') { str += ' | ' + this.expCity; }
        if (this.expState !== '') { str += ', ' + this.expState; }
        if (this.expCountry !== '') { str += ', ' + this.expCountry; }
        if (this.isWorking) { str += ' | Current'; }
        if (this.expEndDate !== '') { str +=  ' | ' + this.expEndDate; }
        if (this.expStartDate !== '') { str += ' - ' + this.expStartDate; }
        return str;
    }
}

export default Experience