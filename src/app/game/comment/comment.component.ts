import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  commentForm: FormGroup;

  comment = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(80),
  ]);

  constructor(
    private builder: FormBuilder,
    private router: Router,
  ) {
    this.commentForm = this.builder.group({
      comment: this.comment,
    });
  }

  ngOnInit() {
  }

  async save() {
    console.log('save() called! ' + this.comment.value);

    await this.router.navigate(['/top']);
    // TODO: トップページの最上部にスクロールしたい
  }
}
