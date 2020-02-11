import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopComponent } from './top/top.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { RecordComponent } from './record/record.component';
import { RankingComponent } from './ranking/ranking.component';
import { HelpComponent } from './help/help.component';
import { LinkComponent } from './link/link.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { TeamComponent } from './team/team.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/top', pathMatch: 'full'},
      {path: 'about', component: AboutComponent},
      {path: 'team', component: TeamComponent},
      {path: 'add_team', component: AddTeamComponent},
      {path: 'help', component: HelpComponent},
      {path: 'link', component: LinkComponent},
      {path: 'news', component: NewsComponent},
      {path: 'ranking', component: RankingComponent},
      {path: 'record', component: RecordComponent},
      {path: 'top', component: TopComponent},
      {path: 'game', component: GameComponent},
      {path: '**', redirectTo: '/top'},
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
