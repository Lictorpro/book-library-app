import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recommendation-modal',
  templateUrl: './recommendation-modal.component.html',
  styleUrls: ['./recommendation-modal.component.scss'],
})
export class RecommendationModalComponent implements OnInit {

  @ViewChild("f", { static: true }) form: NgForm;
  @Input() title: string;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() rating: number;
  @Input() text: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss({
      recommendationData:
      {
        rating: this.form.value['rating'],
        text: this.form.value['text'],
      }
    }, 'confirm');
  }

}
