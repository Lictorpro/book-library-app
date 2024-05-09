import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksPageRoutingModule } from './books-routing.module';

import { BooksPage } from './books.page';
import { BookElementComponent } from './book-element/book-element.component';
import { BookModalComponent } from './book-modal/book-modal.component';
import { RecommendationModalComponent } from '../recommendations/recommendation-modal/recommendation-modal.component';
import { StatusModalComponent } from './status-modal/status-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksPageRoutingModule
  ],
  declarations: [
    BooksPage,
    BookElementComponent,
    BookModalComponent,
    RecommendationModalComponent,
    StatusModalComponent
  ]
})
export class BooksPageModule { }
