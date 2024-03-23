import { Injectable } from '@angular/core';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [
    { id: "1", title: "It", author: "Stephen King", genre: "Horror", publisher: "Penguin books", pages: 1023, imageUrl: "https://prodimage.images-bn.com/pimages/9781501142970_p0_v3_s1200x630.jpg", status: "read" },
    { id: "2", title: "Neverwhere", author: "Neil Gaiman", genre: "Fantasy", publisher: "Shotgun inc", pages: 320, imageUrl: "https://store.headline.co.uk/cdn/shop/products/9780755322800-original.jpg?v=1707148763", status: "unread" },
    { id: "3", title: "Na Drini cuprija", author: "Ivo Andric", genre: "History", publisher: "Laguna", pages: 719, imageUrl: "https://pictures.abebooks.com/isbn/9788650526507-uk.jpg", status: "reading" },
    { id: "4", title: "Dune", author: "Frank Herbert", genre: "Sci-fi", publisher: "Chilton Books", pages: 896, imageUrl: "https://images.booksense.com/images/719/172/9780441172719.jpg", status: "unread" },
  ];

  constructor() { }

  getBook(id: string) {
    return this.books.find(b => b.id === id);
  }
}