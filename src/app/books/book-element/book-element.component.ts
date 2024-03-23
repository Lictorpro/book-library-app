import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-element',
  templateUrl: './book-element.component.html',
  styleUrls: ['./book-element.component.scss'],
})
export class BookElementComponent implements OnInit {

  @Input() book: Book = { id: "1", title: "It", author: "Stephen King", genre: "Horror", publisher: "Penguin books", pages: 1023, imageUrl: "https://prodimage.images-bn.com/pimages/9781501142970_p0_v3_s1200x630.jpg", status: "read" }
  constructor() { }

  ngOnInit() { }

}
