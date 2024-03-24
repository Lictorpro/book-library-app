import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BooksService } from './books.service';
import { ModalController } from '@ionic/angular';
import { BookModalComponent } from './book-modal/book-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit, OnDestroy {

  books: Book[] = [];
  filteredBooks: Book[] = [];
  private booksSub: Subscription;

  constructor(private booksService: BooksService, private modalCtrl: ModalController) {
    //this.books = this.booksService.books;

  }

  ngOnInit() {
    this.booksSub = this.booksService.books.subscribe((books) => {
      this.books = books;
      this.filteredBooks = [...this.books];
    });
  }

  ionViewWillEnter() {
    this.booksService.getBooks().subscribe((books) => {
      //this.books = books;
      this.filteredBooks = [...this.books];
    });
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
        this.booksService.addBook(resultData.data.bookData.title, resultData.data.bookData.author, resultData.data.bookData.publisher, resultData.data.bookData.genre, resultData.data.bookData.pages, resultData.data.bookData.status)
          .subscribe((books) => {
            //this.books = books;
            this.filteredBooks = [...this.books];
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.booksSub) {
      this.booksSub.unsubscribe();
    }
  }
}
