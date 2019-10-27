import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { AddTeamComponent } from './add-team/add-team.component';



@NgModule({
  declarations: [TeamComponent, AddTeamComponent],
  imports: [
    CommonModule
  ]
})
export class TeamModule { }
