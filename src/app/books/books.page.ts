import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BooksService } from './books.service';
import { ModalController } from '@ionic/angular';
import { BookModalComponent } from './book-modal/book-modal.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {

  books: Book[] = [];
  filteredBooks: Book[] = [];

  constructor(private booksService: BooksService, private modalCtrl: ModalController) {
    this.books = this.booksService.books;
    this.filteredBooks = [...this.books];
  }

  ngOnInit() {
  }

  filterBooks(event: any) {
    const status = event.detail.value;
    if (status === 'all') {
      this.filteredBooks = [...this.books];
    } else {
      this.filteredBooks = this.books.filter(book => book.status === status);
    }
  }

  openModal() {
    this.modalCtrl.create({
      component: BookModalComponent,
      componentProps: { title: 'Add book' }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);
      }
    });
  }

}
