import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(5)
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  loginForm = this.builder.group({
    username: this.username,
    password: this.password,
  });

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
  }

  login() {
    this.username.reset();
    this.password.reset();
    console.log('login!');
  }
}
