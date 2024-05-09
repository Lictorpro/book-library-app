import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

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

  imageSource: any;

  constructor(private modalCtrl: ModalController) { }

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
        status: this.form.value['status']
      }
    }, 'confirm');
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.imageSource = image.dataUrl;

  }
}