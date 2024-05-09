import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  book: Book = <Book>{};
  constructor(private route: ActivatedRoute, private booksService: BooksService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.booksService.getBook(paramMap.get('bookId')).subscribe((book) => {
        this.book = book;
        console.log(book);
      });
    })
  }

}
