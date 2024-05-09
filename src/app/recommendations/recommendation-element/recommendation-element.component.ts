import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/books/book.model';
import { BookExtended } from '../book-extended.model';

@Component({
  selector: 'app-recommendation-element',
  templateUrl: './recommendation-element.component.html',
  styleUrls: ['./recommendation-element.component.scss'],
})
export class RecommendationElementComponent implements OnInit {

  @Input() bookExtended: BookExtended;
  constructor() { }

  ngOnInit() { }

}
