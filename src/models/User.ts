
/**
 * Data model class for Users.
 */

export class User {

  userName: string;
  passWord: string;
  email: string;

  constructor(userName: string, passWord: string, email: string) {

    this.userName = userName;
    this.passWord = passWord;
    this.email = email;
  }

  alterUser(stat: string, newValue: string) {

    if (stat === 'userName' || stat === 'passWord' || stat === 'email') {
      this[stat] = newValue;
    } else {
      console.log('invalid stat while altering user!');
    }
  } // end alterUser()
} // end class
