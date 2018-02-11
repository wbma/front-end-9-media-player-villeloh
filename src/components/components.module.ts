import { NgModule } from '@angular/core';
import { ImageBoxComponent } from './image-box/image-box';
import { ImgModalComponent } from './img-modal/img-modal';
@NgModule({
	declarations: [ImageBoxComponent,
    ImgModalComponent],
	imports: [],
	exports: [ImageBoxComponent,
    ImgModalComponent]
})
export class ComponentsModule {}
