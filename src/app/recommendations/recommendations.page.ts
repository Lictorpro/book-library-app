import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../books/book.model';
import { Recommendation } from './recommendation.model';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { Subscription } from 'rxjs';
import { BooksService } from '../books/books.service';
import { AuthService } from '../auth/auth.service';
import { BookExtended } from './book-extended.model';
import { RecommendationsService } from './recommendations.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.page.html',
  styleUrls: ['./recommendations.page.scss'],
})
export class RecommendationsPage implements OnInit {
  books: Book[] = [];
  private booksSub: Subscription;
  userId: string;
  bookExtended: BookExtended;
  booksExtended: BookExtended[] = [];
  recommendation: Recommendation;
  constructor(private booksService: BooksService, private authService: AuthService, private recommendationsService: RecommendationsService) { }

  ngOnInit() {
    this.authService.userId.subscribe(userId => this.userId = userId);
    this.booksService.getAllBooks(this.userId).subscribe((books) => {
      this.books = books;
      for (let book of this.books) {
        this.recommendationsService.getRecommendation(book.recommendId).subscribe(recommendation => {
          this.recommendation = recommendation;
          this.bookExtended = new BookExtended(book.id, book.title, book.author, book.genre, book.publisher, book.pages, book.status, book.imageUrl, book.userId, book.recommendId, recommendation.rating, recommendation.text);
          console.log(this.bookExtended);
          this.booksExtended.push(this.bookExtended);
          this.booksExtended = this.booksExtended.filter(book => book.userId !== this.userId && book.recommendId !== '');
        });
      }
    });




    this.scheduleNotification();
  }

  async scheduleNotification() {

    let options: ScheduleOptions = {
      notifications: [{
        id: 111,
        title: 'Reading reminder',
        body: 'Continue reading your books',
        largeBody: 'Jump back to world of reading and enjoy beautiful stories',
        summaryText: 'Books are waiting for you!',
        schedule: {
          allowWhileIdle: true,
          every: 'minute',
          on: {
            minute: 1
          }
        }
      }
      ]
    }

    try {
      await LocalNotifications.schedule(options);
    } catch (ex) {
      console.log(ex);
    }
  }

}
