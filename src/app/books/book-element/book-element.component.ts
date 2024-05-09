import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Book } from '../book.model';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { BooksService } from '../books.service';
import { RecommendationModalComponent } from 'src/app/recommendations/recommendation-modal/recommendation-modal.component';
import { RecommendationsService } from 'src/app/recommendations/recommendations.service';
import { Recommendation } from '../../recommendations/recommendation.model';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { StatusModalComponent } from '../status-modal/status-modal.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-book-element',
  templateUrl: './book-element.component.html',
  styleUrls: ['./book-element.component.scss'],
})
export class BookElementComponent implements OnInit {

  @Input() book: Book;
  @Input() recommendation: Recommendation;
  @ViewChild('popover') popover;
  constructor(private alertCtrl: AlertController, private bookService: BooksService, private modalCtrl: ModalController, private recommendationService: RecommendationsService, private popoverController: PopoverController) { }

  ngOnInit() { }

  isOpen = false;

  showOptions(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.popover.event = e;
    this.isOpen = true;
  }

  openAlert() {
    event.stopPropagation();
    event.preventDefault();
    this.isOpen = false;
    this.alertCtrl.create({
      header: 'Deleting book',
      message: 'Are you sure you want to delete this book?',
      buttons: [{
        text: 'Delete',
        handler: () => {
          console.log(this.book.id);
          this.bookService.deleteBook(this.book.id).subscribe(() => {

          });
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          console.log('Do not delete it');
        }
      }]
    }).then(alert => alert.present());
  }

  openModal(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.modalCtrl.create({
      component: RecommendationModalComponent,
      componentProps: { title: 'Add recommendation' }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      console.log('Res data iz add recommendatiuosna');
      console.log(resultData);
      if (resultData.role === 'confirm') {
        console.log(resultData);
        this.recommendationService.addRecommendation(resultData.data.recommendationData.rating, resultData.data.recommendationData.text)
          .subscribe((recommendation) => {
            console.log(recommendation);
            this.bookService.editBook(this.book.id, this.book.title, this.book.author, this.book.genre, this.book.publisher, this.book.imageUrl, this.book.pages, this.book.status, this.book.userId, recommendation.id).subscribe(books => { });
          });
      }
    });
  }


  async openModalEdit(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    console.log('On edit recommendation');
    const recommendation = await this.recommendationService.getRecommendation(this.book.recommendId).toPromise();
    this.recommendation = recommendation
    console.log(this.recommendation);
    const modal = await this.modalCtrl.create({
      component: RecommendationModalComponent,
      componentProps: {
        title: 'Edit recommendation',
        rating: +this.recommendation.rating,
        text: this.recommendation.text,
        mode: 'edit'
      }

    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log(data);

    if (role === 'confirm') {
      this.recommendationService
        .editRecommendation(
          this.recommendation.id,
          data.recommendationData.rating,
          data.recommendationData.text
        )
        .subscribe((recommendation) => {
          this.recommendation.rating = data.recommendationData.rating;
          this.recommendation.text = data.recommendationData.title;
        });
    }
  }

  async onEditBook() {
    console.log('On edit book');
    const modal = await this.modalCtrl.create({
      component: BookModalComponent,
      componentProps: {

        title: 'Edit book',
        bookTitle: this.book.title,
        author: this.book.author,
        genre: this.book.genre,
        pages: this.book.pages,
        publisher: this.book.publisher,
        status: this.book.status,
        mode: 'edit'
      }

    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log(data);

    if (role === 'confirm') {
      this.bookService
        .editBook(
          this.book.id,
          data.bookData.title,
          data.bookData.author,
          data.bookData.genre,
          data.bookData.publisher,
          this.book.imageUrl,
          data.bookData.pages,
          data.bookData.status,
          this.book.userId,
          this.book.recommendId

        )
        .subscribe((book) => {
          this.book.title = data.bookData.bookTitle;
          this.book.author = data.bookData.author;
          this.book.genre = data.bookData.genre;
          this.book.publisher = data.bookData.publisher;
          this.book.pages = +data.bookData.pages;
          this.book.status = data.bookData.status;
        });
    }

    this.popoverController.dismiss();
  }

  async onChangeStatus() {
    const modal = await this.modalCtrl.create({
      component: StatusModalComponent,
      componentProps: {

        title: 'Change status',
        bookTitle: this.book.title,
        author: this.book.author,
        genre: this.book.genre,
        pages: this.book.pages,
        publisher: this.book.publisher,
        status: this.book.status,
        mode: 'edit'
      }

    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log(data);

    if (role === 'confirm') {
      this.bookService
        .editBook(
          this.book.id,
          this.book.title,
          this.book.author,
          this.book.genre,
          this.book.publisher,
          this.book.imageUrl,
          this.book.pages,
          data.bookData.status,
          this.book.userId,
          this.book.recommendId

        )
        .subscribe((book) => {
          console.log(data);
          this.book.title = data.bookData.bookTitle;
          this.book.author = data.bookData.author;
          this.book.genre = data.bookData.genre;
          this.book.publisher = data.bookData.publisher;
          this.book.pages = +data.bookData.pages;
          this.book.status = data.bookData.status;
          this.book.recommendId = data.bookData.recommendId;
        });
    }

    this.popoverController.dismiss();
  }

}
