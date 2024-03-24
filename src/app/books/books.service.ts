import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';


interface BookData {
  title: string;
  author: string;
  publisher: string;
  genre: string;
  pages: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private _books = new BehaviorSubject<Book[]>([]);
  oldBooks: Book[] = [
    { id: "1", title: "It", author: "Stephen King", genre: "Horror", publisher: "Penguin books", pages: 1023, imageUrl: "https://prodimage.images-bn.com/pimages/9781501142970_p0_v3_s1200x630.jpg", status: "read" },
    { id: "2", title: "Neverwhere", author: "Neil Gaiman", genre: "Fantasy", publisher: "Shotgun inc", pages: 320, imageUrl: "https://store.headline.co.uk/cdn/shop/products/9780755322800-original.jpg?v=1707148763", status: "unread" },
    { id: "3", title: "Na Drini cuprija", author: "Ivo Andric", genre: "History", publisher: "Laguna", pages: 719, imageUrl: "https://pictures.abebooks.com/isbn/9788650526507-uk.jpg", status: "reading" },
    { id: "4", title: "Dune", author: "Frank Herbert", genre: "Sci-fi", publisher: "Chilton Books", pages: 896, imageUrl: "https://images.booksense.com/images/719/172/9780441172719.jpg", status: "unread" },
  ];

  constructor(private http: HttpClient) { }

  get books() {
    return this._books.asObservable();
  }

  addBook(title: string, author: string, publisher: string, genre: string, pages: number, status: string) {

    let generatedId;

    return this.http.post<{ name: string }>('https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/books.json', { title, author, publisher, genre, pages, status })
      .pipe(switchMap((resData) => {
        generatedId = resData.name;
        return this.books;
      }),
        take(1),
        tap((books => {
          this._books.next(books.concat({
            id: generatedId,
            title,
            author,
            publisher,
            genre,
            pages,
            status,
            imageUrl: 'https://prodimage.images-bn.com/pimages/9781501142970_p0_v3_s1200x630.jpg'
          }));
          return this._books;
        })));
  }

  getBooks() {
    return this.http.get<{ [key: string]: BookData }>('https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/books.json')
      .pipe(map((booksData) => {
        const books: Book[] = [];
        for (const key in booksData) {
          if (booksData.hasOwnProperty(key)) {
            books.push({
              id: key,
              title: booksData[key].title,
              author: booksData[key].author,
              publisher: booksData[key].publisher,
              genre: booksData[key].genre,
              pages: booksData[key].pages,
              status: booksData[key].status,
              imageUrl: "https://prodimage.images-bn.com/pimages/9781501142970_p0_v3_s1200x630.jpg",
            });
          }
        }
        this._books.next(books);
        return books;
      }),
        tap(books => {
          this._books.next(books);
        })
      );
  }

  getBook(id: string) {
    return this.oldBooks.find(b => b.id === id);
  }
}
