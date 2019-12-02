import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { UserService } from './user.service';
import { TeamService } from '../../team/team.service';
import { ConfigService } from 'ngx-envconfig';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  teamParam = this.configService.get('team_param');

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(this.teamParam.owner_name_length.min),
    Validators.maxLength(this.teamParam.owner_name_length.max),
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(this.teamParam.password_length.min),
    Validators.maxLength(this.teamParam.password_length.max),
  ]);

  constructor(
    private configService: ConfigService,
    private builder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private teamService: TeamService,
  ) {
    this.loginForm = this.builder.group({
      username: this.username,
      password: this.password,
    });
  }

  ngOnInit() {
  }

  async login() {
    const username = this.username.value;
    const password = CryptoJS.SHA256(this.password.value).toString();

    const teamId = await this.userService.authentication(username, password);

    if (teamId > 0) {
      this.teamService.loginTeamId = teamId;
      await this.router.navigate(['/team']);
    }
    else {
      this.password.reset();
      // this.username.reset();

      // Error メッセージを表示させる。
      this.errorMessage = '【認証エラー】監督名またはパスワードに誤りがあります。';
    }
  }
}
