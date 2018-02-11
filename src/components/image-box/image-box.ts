import { ThumbnailPipe } from './../../pipes/thumbnail/thumbnail';
import { DlImage } from './../../models/DlImage';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'image-box',
  templateUrl: 'image-box.html'
})
export class ImageBoxComponent {

  @Input()
  img: any;

  constructor() {
  }
}
