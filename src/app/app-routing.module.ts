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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/top', pathMatch: 'full'},
      {path: 'about', component: AboutComponent},
      {path: 'help', component: HelpComponent},
      {path: 'link', component: LinkComponent},
      {path: 'news', component: NewsComponent},
      {path: 'ranking', component: RankingComponent},
      {path: 'record', component: RecordComponent},
      {path: 'top', component: TopComponent},
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
