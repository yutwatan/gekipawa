import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './record.component';
import { SeasonComponent } from './season/season.component';
import { GameComponent } from './game/game.component';
import { TotalComponent } from './total/total.component';



@NgModule({
  declarations: [RecordComponent, SeasonComponent, GameComponent, TotalComponent],
  imports: [
    CommonModule
  ]
})
export class RecordModule { }
