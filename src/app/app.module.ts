import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ConfigModule } from 'ngx-envconfig';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { TopModule } from './top/top.module';
import { AboutModule } from './about/about.module';
import { HelpModule } from './help/help.module';
import { NewsModule } from './news/news.module';
import { RankingModule } from './ranking/ranking.module';
import { RecordModule } from './record/record.module';
import { TeamModule } from './team/team.module';
import { LinkModule } from './link/link.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ConfigModule.forRoot(environment),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TopModule,
    AboutModule,
    HelpModule,
    NewsModule,
    RankingModule,
    RecordModule,
    TeamModule,
    LinkModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
