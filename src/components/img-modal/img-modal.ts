import { UserProvider } from './../../providers/UserProvider';
import { ThumbnailPipe } from './../../pipes/thumbnail/thumbnail';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ImgProvider } from './../../providers/ImgProvider';
import { DlImage } from './../../models/DlImage';
import { ImgListPage } from './../../pages/img-list/img-list';
import { Page } from 'ionic-angular/navigation/nav-util';
import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Presents a larger view of the image (with controls), upon clicking
 * it in the main image list view.
 */

@Component({
  selector: 'img-modal',
  templateUrl: 'img-modal.html'
})
export class ImgModalComponent {

  dlImage: DlImage;
  filename: string; // 'src' attribute value for the image in the modal
  file_id: number;
  title: string;
  description: string;

  username: string;
  numOfLikes: number;
  likedByMe: boolean;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    public imgProvider: ImgProvider,
    public userProvider: UserProvider) {

    this.dlImage = params.get('dlImage');
    this.filename = this.dlImage.filename;
    this.file_id = this.dlImage.file_id;
    this.description = this.dlImage.description;
    this.title = this.dlImage.title;
    this.likedByMe = false; // by default; could be either

    this.obtainUsernameNumOfFavsAndOwnFavStatus(this.dlImage);
  }

  closeModal(info?: any) {

    this.viewCtrl.dismiss(info);
  }

  // called upon clicking a cross in the corner of the image
  delete(img: DlImage) {

    const id: number = img.file_id;
    console.log("id: " + id);

    this.imgProvider.deleteImage(id)
    .subscribe(res => {
      console.log("deleted img # " + id);
    },
    (error: HttpErrorResponse) => console.log(error.error.message));
  } // end delete()

  // blame the mechanics of subscribe() for the name of this method...
  // should probably teach async/await so that ppl can avoid this mess
  obtainUsernameNumOfFavsAndOwnFavStatus(dlImage: DlImage) {

    this.userProvider.getUserInfo()
    .subscribe(res => {

      this.username = res['username'];

      this.userProvider.getFavoritesOfUser()
      .subscribe(res => {

        if (res === null || res === undefined) {
          return;
        }

        res.forEach(item => {

          if (item['file_id'] === dlImage.file_id) {
            this.likedByMe = true;
            return;
          }
        });

        this.imgProvider.getFavoritesOfFile(dlImage)
        .subscribe(res => {

          this.numOfLikes = res.length;
        }); // end inner subscribe()
      }); // end middle subscribe()
    }); // end outer subscribe()
  } // end obtainUsernameNumOfFavsAndOwnFavStatus()
} // end class
