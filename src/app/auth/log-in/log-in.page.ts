import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onLogIn(form: NgForm) {
    this.isLoading = true;
    this.authService.logIn(form.value).subscribe((resData) => {
      this.isLoading = false;
      this.router.navigateByUrl('/books');
    },
      errRes => {
        console.log(errRes);
        this.isLoading = false;
        let message = 'Error occurred, try again';
        const errCode = errRes.error.error.message;

        if (errCode === 'INVALID_LOGIN_CREDENTIALS') {
          message = 'Incorrect email or password';
        }

        this.alertCtrl.create({
          header: 'Authentication failed',
          message: message,
          buttons: ['Okay']
        }).then((alert) => {
          alert.present();
        })

      });
  }

}
