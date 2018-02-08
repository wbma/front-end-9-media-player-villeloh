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
  baseApiUrl = 'http://media.mw.metropolia.fi/wbma/';

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
    this.buildImageList('large');
  }

  buildImageList(imgSize: string) {

    const SizeEnum = Object.freeze({'small': '-tn160.png', 'regular': '-tn320.png', 'large': '-tn640.png'});

    let tempArray;
    let tempStr;
    let filename;
    let dlImg;

    this.userProvider.getUserInfo()
    .subscribe(user => {

      const userId = user['user_id'];

      this.imgProvider.getImagesByUserId(userId)
      .subscribe(imgs => {

        for (let i = 0; i < imgs.length; i++) {

          tempArray = imgs[i]['filename'].split('.'); // '[pic png]'
          tempStr = tempArray[0]; // 'pic'
          imgs[i]['filename'] = this.baseApiUrl + 'uploads/' + tempStr + SizeEnum[imgSize]; // replace original image url

          dlImg = new DlImage(imgs[i]['title'], imgs[i]['filename'], imgs[i]['description'], imgs[i]['time_added'],
          imgs[i]['user_id'], imgs[i]['file_id'], imgs[i]['thumbnails']);
          this.imageList[i] = dlImg;
        }
      });
    });
  } // end buildImageList()

  upload() {

    const storedThis = this; // store a 'this' reference for use in the setTimeOut()

    const formData: FormData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.title);
    formData.append('description', this.description);

    this.imgProvider.uploadImage(formData)
    .subscribe(res => {

      console.log('Upload response: ' + JSON.stringify(res));

      const delay = 2000; // unworkable... it loads it alright, but this takes *way* too long!

      setTimeout(function() {

        storedThis.buildImageList('large'); // inefficient... should just add it to the page. caching etc is needed as well...
      }, delay);
    },
    (error: HttpErrorResponse) => console.log(error.error.message));
  } // end upload()

  getFile(event: any) {

    this.file = event.target.files[0];
  }

  delete(event) {

    console.log("image.target :" + event.target);
    const id: number = event.target.img.file_id;

    this.imgProvider.deleteImage(id)
    .subscribe(res => {
      console.log("deleted img # " + id);
    },
    (error: HttpErrorResponse) => console.log(error.error.message));
  } // end delete()
} // end class
