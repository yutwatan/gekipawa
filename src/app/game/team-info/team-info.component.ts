import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TeamService } from '../../team/team.service';
import { TeamInfo } from '../../team/team-info';
import { CurrentService } from '../../top/current.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit, OnChanges {
  @Input() teamId: number;
  @Input() continueWin: number;

  teamInfo: TeamInfo;

  constructor(
    private currentService: CurrentService,
    private teamService: TeamService,
  ) { }

  async ngOnInit() {
    if (this.teamId) {
      this.teamInfo = await this.teamService.getTeam(this.teamId);
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.teamId) {
      this.teamId = changes.teamId.currentValue;
      if (this.teamId) {
        this.teamInfo = await this.teamService.getTeam(this.teamId);
      }
    }
  }
}
