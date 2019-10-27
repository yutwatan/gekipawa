import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TeamComponent,
    AddTeamComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class TeamModule { }
