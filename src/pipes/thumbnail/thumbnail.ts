import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe to transform image urls (to display differently sized images).
 */

@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

  baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  transform(value: any, size?: string): string {

    const defaultSize = '-tn320.png';
    let usedSize;

    if (size ==='normal' || size === null) {
      usedSize = defaultSize;
    } else if (size === 'small') {
      usedSize = '-tn160.png';
    } else if (size === 'large') {
      usedSize = '-tn640.png';
    } else {
      console.log('invalid thumbnail pipe size specified!');
    }

    let tempArray;
    let tempStr;

    tempArray = value.split('.'); // value = 'filename' attribute; result: [pic png]
    tempStr = tempArray[0]; // result: 'pic'
    return this.baseUrl + tempStr + usedSize; // replace original image url
  }
} // end class
