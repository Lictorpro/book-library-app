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

  book: Book = { id: "1", title: "It", author: "Stephen King", genre: "Horror", publisher: "Penguin books", pages: 1023, imageUrl: "https://prodimage.images-bn.com/pimages/9781501142970_p0_v3_s1200x630.jpg", status: "read" }
  constructor(private route: ActivatedRoute, private booksService: BooksService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.book = this.booksService.getBook(paramMap.get('bookId'));
    })
  }

}
