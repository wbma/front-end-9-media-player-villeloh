import { LoginPage } from './../login/login';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginPage: any = LoginPage;
  registerPage: any = RegisterPage;

  constructor(public navCtrl: NavController) {

  }

  goToPage(page: Page) {

    this.navCtrl.push(page);
  }

}
