class User {
  constructor(
    uid,
    displayName,
    email,
    password,
    role,
    photoURL,
    phoneNumber,
    emailVerified
  ) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.role = role;
    this.password = password;
    this.photoURL = photoURL;
    this.phoneNumber = phoneNumber;
    this.emailVerified = emailVerified;
    this.createdAt = new Date();
  }
}

module.exports = User;
