import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
})
export class BookModalComponent implements OnInit {
  @ViewChild("f", { static: true }) form: NgForm;
  @Input() title: string;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() bookTitle: string;
  @Input() author: string;
  @Input() genre: string;
  @Input() publisher: string;
  @Input() pages: number;
  @Input() status: string;
  @Input() imageUrl: string = 'https://static.vecteezy.com/system/resources/thumbnails/002/219/582/small/illustration-of-book-icon-free-vector.jpg';

  imageSource: any;

  constructor(private modalCtrl: ModalController, private storage: Storage) { }

  ngOnInit() { }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  /*onAddBook(form: NgForm) {
    this.modalCtrl.dismiss({
      bookData: {
        title: form.value['title'],
        author: form.value['author'],
        publisher: form.value['publisher'],
        genre: form.value['genre'],
        pages: form.value['pages'],
        status: form.value['status'],
      }
    },
      'confirm')
  }*/

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      bookData:
      {
        title: this.form.value['title'],
        author: this.form.value['author'],
        genre: this.form.value['genre'],
        publisher: this.form.value['publisher'],
        pages: this.form.value['pages'],
        status: this.form.value['status'],
        imageUrl: this.imageUrl
      }
    }, 'confirm');

    console.log('Slika iz on submita: ' + this.imageUrl);
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.imageSource = image.dataUrl;
    const blob = this.dataURLtoBlob(image.dataUrl);
    const url = await this.uploadImage(blob, image);
    console.log(url);
    this.imageUrl = url;
  }

  dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  async uploadImage(blob: any, imageData: any) {
    try {
      const currentDate = Date.now();
      const filePath = `test/${currentDate}.${imageData.format}`;
      const fileRef = ref(this.storage, filePath);
      const task = await uploadBytes(fileRef, blob);
      const url = getDownloadURL(fileRef);
      return url;
    } catch (e) {
      throw (e);
    }
  }
}