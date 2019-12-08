import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GameComponent } from './game.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { InningResultComponent } from './inning-result/inning-result.component';
import { ResultComponent } from './result/result.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    GameComponent,
    TeamInfoComponent,
    InningResultComponent,
    ResultComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class GameModule { }
