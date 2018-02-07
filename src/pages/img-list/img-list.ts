import { ImageBoxComponent } from './../../components/image-box/image-box';
import { DlImage } from './../../models/DlImage';
import { UserProvider } from './../../providers/UserProvider';
import { ImgProvider } from './../../providers/ImgProvider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http/src/response';

@IonicPage()
@Component({
  selector: 'page-img-list',
  templateUrl: 'img-list.html',
})
export class ImgListPage {

  imageList: DlImage[];

  file: File;
  title: string;
  description: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public imgProvider: ImgProvider,
    public userProvider: UserProvider) {
  }

  ionViewDidLoad() {

    this.imageList = [];
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

  upload() {

    const formData: FormData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.title);
    formData.append('description', this.description);

    this.imgProvider.uploadImage(formData)
    .subscribe(res => {

      console.log('Upload response: ' + JSON.stringify(res));
      this.buildImageList(); // inefficient... should just add it to the page. caching etc is needed as well...
    },
    (error: HttpErrorResponse) => console.log(error.error.message));
  } // end upload()

  getFile(event: any) {

    this.file = event.target.files[0];
  }

} // end class
