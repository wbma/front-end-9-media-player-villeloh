
/**
 * Data model class for custom image objects.
 */

export class DlImage {

  title: string;
  description: string;
  filename: string;
  file_id: number;
  user_id: number;
  time_added: string;
  thumbnails: Object;

  constructor(
    title: string = '', filename: string = '', file_id: number = 0, user_id: number = 0,
    desc: string = '', time_added: string = '', thumbnails: Object = {}) {

    this.title = title;
    this.description = desc;
    this.filename = filename;
    this.file_id = file_id;
    this.user_id = user_id;
    this.time_added = time_added;
    this.thumbnails = thumbnails;
  }

  convertObjToDlImg(obj: object) {

    Object.assign(this, obj); // does 'this' have the correct reference here..?
  }

  alterDlImg(stat: string, newValue: string) {

    if (stat === 'title' || stat === 'description') {
      this[stat] = newValue;
    } else {
      console.log('invalid stat while altering dlImage!');
    }
  } // end alterDlImg()
} // end class
