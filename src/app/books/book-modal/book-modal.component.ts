import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
})
export class BookModalComponent implements OnInit {
  @Input() title: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddBook(form: NgForm) {
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
  }

}
