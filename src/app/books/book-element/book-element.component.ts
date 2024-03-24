import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Book } from '../book.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-book-element',
  templateUrl: './book-element.component.html',
  styleUrls: ['./book-element.component.scss'],
})
export class BookElementComponent implements OnInit {

  @Input() book: Book = { id: "1", title: "It", author: "Stephen King", genre: "Horror", publisher: "Penguin books", pages: 1023, imageUrl: "https://prodimage.images-bn.com/pimages/9781501142970_p0_v3_s1200x630.jpg", status: "read" }
  @ViewChild('popover') popover;
  constructor(private alertCtrl: AlertController) { }

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
          console.log('Deleted');
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

}
