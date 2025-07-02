class FBUser {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }
}

module.exports = FBUser;
