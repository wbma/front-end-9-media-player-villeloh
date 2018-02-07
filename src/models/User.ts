
/**
 * Data model class for Users.
 */

export class User {

  username: string;
  password: string;
  email: string;

  constructor(username: string = '', password: string = '', email: string = '') {

    this.username = username;
    this.password = password;
    this.email = email;
  }

  alterUser(stat: string, newValue: string) {

    if (stat === 'username' || stat === 'password' || stat === 'email') {
      this[stat] = newValue;
    } else {
      console.log('invalid stat while altering user!');
    }
  } // end alterUser()
} // end class
