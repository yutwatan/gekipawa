import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopComponent } from './top.component';
import { GekipawaInfoComponent } from './gekipawa-info/gekipawa-info.component';
import { AuthComponent } from './auth/auth.component';
import { TeamRankComponent } from './team-rank/team-rank.component';
import { NowChampionComponent } from './now-champion/now-champion.component';
import { RecentGameComponent } from './recent-game/recent-game.component';
import { NewsCommentComponent } from './news-comment/news-comment.component';

@NgModule({
  declarations: [
    TopComponent,
    GekipawaInfoComponent,
    AuthComponent,
    TeamRankComponent,
    NowChampionComponent,
    RecentGameComponent,
    NewsCommentComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class TopModule { }
