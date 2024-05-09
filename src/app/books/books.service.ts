import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';


interface BookData {
  title: string;
  author: string;
  publisher: string;
  genre: string;
  pages: number;
  status: string;
  imageUrl: string;
  userId: string;
  recommendId: string;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private _books = new BehaviorSubject<Book[]>([]);
  /*oldBooks: Book[] = [
    { id: "1", title: "It", author: "Stephen King", genre: "Horror", publisher: "Penguin books", pages: 1023, imageUrl: "https://prodimage.images-bn.com/pimages/9781501142970_p0_v3_s1200x630.jpg", status: "read", userId: 'sss' },
    { id: "2", title: "Neverwhere", author: "Neil Gaiman", genre: "Fantasy", publisher: "Shotgun inc", pages: 320, imageUrl: "https://store.headline.co.uk/cdn/shop/products/9780755322800-original.jpg?v=1707148763", status: "unread", userId: 'sss' },
    { id: "3", title: "Na Drini cuprija", author: "Ivo Andric", genre: "History", publisher: "Laguna", pages: 719, imageUrl: "https://pictures.abebooks.com/isbn/9788650526507-uk.jpg", status: "reading", userId: 'sss' },
    { id: "4", title: "Dune", author: "Frank Herbert", genre: "Sci-fi", publisher: "Chilton Books", pages: 896, imageUrl: "https://images.booksense.com/images/719/172/9780441172719.jpg", status: "unread", userId: 'sss' },
  ];*/

  constructor(private http: HttpClient, private authService: AuthService) { }

  get books() {
    return this._books.asObservable();
  }

  addBook(title: string, author: string, publisher: string, genre: string, pages: number, status: string, recommendId: string, imageUrl: string) {

    let generatedId;
    let newBook: Book;
    let fetchedUserId: string;

    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        console.log('IZ books' + userId);
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        newBook = new Book(null, title, author, genre, publisher, pages, status, imageUrl, fetchedUserId, recommendId);
        return this.http.post<{ name: string }>(`https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${token}`, newBook);
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.books;
      }),
      take(1),
      tap((books => {
        newBook.id = generatedId;
        this._books.next(books.concat(newBook))
      })))
  }

  getBooks(userId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: BookData }>(`https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${token}`);
      }),
      map((booksData) => {
        const books: Book[] = [];
        for (const key in booksData) {
          if (booksData.hasOwnProperty(key) && booksData[key].userId === userId) {
            books.push(new Book(key, booksData[key].title, booksData[key].author, booksData[key].genre, booksData[key].publisher, booksData[key].pages, booksData[key].status, booksData[key].imageUrl, booksData[key].userId, booksData[key].recommendId));
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

  getAllBooks(userId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: BookData }>(`https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${token}`);
      }),
      map((booksData) => {
        const books: Book[] = [];
        for (const key in booksData) {
          if (booksData.hasOwnProperty(key)) {
            books.push(new Book(key, booksData[key].title, booksData[key].author, booksData[key].genre, booksData[key].publisher, booksData[key].pages, booksData[key].status, booksData[key].imageUrl, booksData[key].userId, booksData[key].recommendId));
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
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<BookData>(
          `https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json?auth=${token}`
        );
      }),
      map((resData) => {
        return new Book(
          id,
          resData.title,
          resData.author,
          resData.genre,
          resData.publisher,
          resData.pages,
          resData.status,
          resData.imageUrl,
          resData.userId,
          resData.recommendId
        );
      })
    );
  }

  deleteBook(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.books;
      }),
      take(1),
      tap((books) => {
        this._books.next(books.filter(book => book.id !== id));
      })
    );
  }

  editBook(bookId: string, title: string, author: string, genre: string, publisher: string, imageUrl: string, pages: number, status: string, userId: string, recommendId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(
          `https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}.json?auth=${token}`,
          { title, author, genre, publisher, imageUrl, pages, status, userId, recommendId }
        );
      }),
      switchMap(() => this.books),
      take(1),
      tap((books) => {
        const updatedBookIndex = books.findIndex((book) => book.id === bookId);
        const updatedBooks = [...books];
        updatedBooks[updatedBookIndex] = new Book(
          bookId,
          title,
          author,
          genre,
          publisher,
          pages,
          status,
          imageUrl,
          books[updatedBookIndex].userId,
          recommendId
        );
        this._books.next(updatedBooks);
      })
    );
  }

}
