import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  public src: SafeUrl = 'https://medifactia.com/wp-content/uploads/2018/01/placeholder.png';

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  public uploadImage({ target }) {
    if (!target.files.length) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      this.src = this.sanitizer.bypassSecurityTrustUrl(event.target.result as string);
    }

    fileReader.readAsDataURL(target.files[0]);
  }

  ngOnInit(): void {
  }

}
