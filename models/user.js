class User {
  constructor(
    userId,
    firstName,
    lastName,
    emailAddress,
    // password,
    address1,
    address2,
    city,
    state,
    zipCode,
    country
  ) {
    this._userId = userId;
    this._firstName = firstName;
    this._lastName = lastName;
    this._emailAddress = emailAddress;
    // this._password = password;
    this._address1 = address1;
    this._address2 = address2;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
    this._country = country;
  }

  set userId(userId) {
    this._userId = userId;
  }
  get userId() {
    return this._userId;
  }
  set firstName(firstName) {
    this._firstName = firstName;
  }
  get firstName() {
    return this._firstName;
  }
  set lastName(lastName) {
    this._lastName = lastName;
  }
  get lastName() {
    return this._lastName;
  }
  set emailAddress(emailAddress) {
    this._emailAddress = emailAddress;
  }
  get emailAddress() {
    return this._emailAddress;
  }

  // set password(password) {
  //   this._password = password;
  // }
  // get password() {
  //   return this._password;
  // }
  set address1(address1) {
    this._address1 = address1;
  }
  get address1() {
    return this._address1;
  }
  set address2(address2) {
    this._address2 = address2;
  }
  get address2() {
    return this._address2;
  }
  set city(city) {
    this._city = city;
  }
  get city() {
    return this._city;
  }
  set state(state) {
    this._state = state;
  }
  get state() {
    return this._state;
  }
  set zipCode(zipCode) {
    this._zipCode = zipCode;
  }
  get zipCode() {
    return this._zipCode;
  }
  set country(country) {
    this._country = country;
  }
  get country() {
    return this._country;
  }
}

module.exports.User = User;
