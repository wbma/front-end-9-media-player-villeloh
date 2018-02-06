import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Provides methods for user operations on the remote server.
 */

@Injectable()
export class UserProvider {

  baseApiUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(public http: HttpClient) {
  }

  registerUser() {}

  loginUser() {}

  updateUser() {}

  deleteUser() {}

  getUserInfo() {

    const token = localStorage.getItem('token'); // will only be called when the user is logged in

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', token)
    };

    return this.http.get(this.baseApiUrl + 'users/user', options);
  } // end getUserInfo()
} // end class
