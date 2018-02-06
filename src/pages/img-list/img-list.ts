import { ImageBoxComponent } from './../../components/image-box/image-box';
import { DlImage } from './../../models/DlImage';
import { UserProvider } from './../../providers/UserProvider';
import { ImgProvider } from './../../providers/ImgProvider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-img-list',
  templateUrl: 'img-list.html',
})
export class ImgListPage {

  imageList: DlImage[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public imgProvider: ImgProvider,
    public userProvider: UserProvider) {
  }

  ionViewDidLoad() {

    this.buildImageList();
  }

  buildImageList() {

    this.userProvider.getUserInfo()
    .subscribe(user => {

      const userId = user['user_id'];

      this.imgProvider.getImagesByUserId(userId)
      .subscribe(imgs => {

        for (let i = 0; i < imgs.length; i++) {

           // no idea if this actually works... seems pretty convoluted, but I need to map the regular objects
           // that arrive from the server to DlImage objects
          let dlImg = new DlImage();
          dlImg.convertObjToDlImg(imgs[i]);
          this.imageList[i] = dlImg;
        }
      });
    });
  } // end buildImageList()
} // end class
