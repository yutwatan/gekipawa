import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { PitcherComponent } from './pitcher/pitcher.component';



@NgModule({
  declarations: [RankingComponent, TeamComponent, PlayerComponent, PitcherComponent],
  imports: [
    CommonModule
  ]
})
export class RankingModule { }
