import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameLog } from '../game.component';
import { CommentService } from './comment.service';
import { TeamService } from '../../team/team.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {
  @Input() gameLog: GameLog;
  @Input() teamId: number;

  private userId: number;
  commentForm: FormGroup;

  comment = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(80),
  ]);

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private commentService: CommentService,
    private teamService: TeamService
  ) {
    this.commentForm = this.builder.group({
      comment: this.comment,
    });
  }

  ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.gameLog) {
      this.gameLog = changes.gameLog.currentValue;
    }

    if (changes.teamId) {
      this.teamId = changes.teamId.currentValue;
      const teamInfo = await this.teamService.getTeam(this.teamId);
      this.userId = teamInfo.owner.id;
    }
  }

  /**
   * Save comment
   */
  async save() {
    console.log('save() called! ' + this.comment.value);

    this.commentService.gameId = this.gameLog.id;
    await this.commentService.addComment(this.comment.value, 'comment', this.userId);

    await this.router.navigate(['/top'], { fragment: 'pageTop' });
  }
}
