class PersonalInfo {
    constructor() {
        this.userFirstName = '';
        this.userLastName = '';
        this.userProfession = '';
        this.userCity = '';
        this.userState = '';
        this.userCountry = '';
        this.userZipcode = '';
        this.userPhone = '';
        this.userEmail = '';
    }

    get firstName() { return this.userFirstName; }
    get lastName() { return this.userLastName; }
    get profession() { return this.userProfession; }
    get city() { return this.userCity; }
    get state() { return this.userState; }
    get country() { return this.userCountry; }
    get zipcode() { return this.userZipcode; }
    get phone() { return this.userPhone; }
    get email() { return this.userEmail; }

    set firstName(newData) { this.userFirstName = newData; }
    set lastName(newData) { this.userLastName = newData; }
    set profession(newData) { this.userProfession = newData; }
    set city(newData) { this.userCity = newData; }
    set state(newData) { this.userState = newData; }
    set country(newData) { this.userCountry = newData; }
    set zipcode(newData) { this.userZipcode = newData; }
    set phone(newData) { this.userPhone = newData; }
    set email(newData) { this.userEmail = newData; }

    update(obj) {
        this.userFirstName = obj.firstName;
        this.userLastName = obj.lastName;
        this.userProfession = obj.profession;
        this.userCity = obj.city;
        this.userState = obj.state;
        this.userCountry = obj.country;
        this.userZipcode = obj.zipcode;
        this.userPhone = obj.phone;
        this.userEmail = obj.email;
    }
    toJSONObject() {
        return {
            "firstName": this.userFirstName,
            "lastName": this.userLastName,
            "profession": this.userProfession,
            "city": this.userCity,
            "state": this.userState,
            "country": this.userCountry,
            "zipcode": this.userZipcode,
            "phone": this.userPhone,
            "email": this.userEmail
        }
    }
}

export default PersonalInfo