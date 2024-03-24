import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogIn(form: NgForm) {
    this.isLoading = true;
    this.authService.logIn(form.value).subscribe((resData) => {
      console.log('Log IN uspesan');
      console.log(resData);
      this.isLoading = false;
      this.router.navigateByUrl('/books');
    });
  }

}
