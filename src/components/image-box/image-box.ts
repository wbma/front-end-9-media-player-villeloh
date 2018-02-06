import { DlImage } from './../../models/DlImage';
import { Component } from '@angular/core';

@Component({
  selector: 'image-box',
  templateUrl: 'image-box.html'
})
export class ImageBoxComponent {

  img: any;

  constructor(dlImage: DlImage) {

    this.img = dlImage;
  }

}
