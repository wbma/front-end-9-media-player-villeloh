import { Page } from 'ionic-angular/navigation/nav-util';
import { ImgListPage } from './../img-list/img-list';
import { UserProvider } from './../../providers/UserProvider';
import { User } from './../../models/User';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http/src/response';

/**
 * Page for registering a new user. Upon successful registering,
 * user is immediately logged in and redirected to the main image list page.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  baseApiUrl = 'http://media.mw.metropolia.fi/wbma/';

  user: User = new User();
  imgListPage: Page = ImgListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
  }

  register(user: User) {

    this.userProvider.registerUser(user)
    .subscribe(res => {

      console.log('Register response: ' + JSON.stringify(res));
      this.userProvider.loginUser(user)
      .subscribe(res => {

        localStorage.setItem('token', res['token']);
        this.navCtrl.push(this.imgListPage);
      },
      (error: HttpErrorResponse) => console.log(error.error.message));
    }
    ,
    (error: HttpErrorResponse) => console.log(error.error.message));
  } // end register()
} // end class
