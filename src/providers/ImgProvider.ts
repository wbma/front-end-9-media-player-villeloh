import { DlImage } from './../models/DlImage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Provides methods for uploading, fetching, deleting and updating images to/from the server.
 */

@Injectable()
export class ImgProvider {

  baseApiUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(public http: HttpClient) {
  }

  getImagesByUserId(id: number) {

    const token = localStorage.getItem('token'); // will only be called when the user is logged in

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', token)
    };

    return this.http.get<object[]>(this.baseApiUrl + 'media/user/' + id, options);
  } // end getImagesByUserId()

  uploadImage(formData: FormData) {

    const url = this.baseApiUrl + 'media';

    // adding Content-Type: multipart/form-data gives an error... while if it's left out, it's added
    // automatically without any problems. -.-
    const options = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.post(url, formData, options);
  } // end uploadImage()

  updateImage() {}

  deleteImage(imgId: number) {

    const url = this.baseApiUrl + 'media/' + imgId;

    const options = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.delete(url, options);
  } // end deleteImage()

  getFavoritesOfFile(dlImage: DlImage) {

    const file_id = dlImage.file_id;
    const url = this.baseApiUrl + 'favourites/file/' + file_id;

    return this.http.get<object[]>(url);
  }
} // end class
