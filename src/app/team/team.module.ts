import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconSelectorComponent } from './icon-selector/icon-selector.component';

@NgModule({
  declarations: [
    TeamComponent,
    AddTeamComponent,
    IconSelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class TeamModule { }
