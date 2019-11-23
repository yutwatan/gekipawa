import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team/team.service';
import { TeamData } from '../../team/team-data';

@Component({
  selector: 'app-team-rank',
  templateUrl: './team-rank.component.html',
  styleUrls: ['./team-rank.component.css']
})
export class TeamRankComponent implements OnInit {
  teams: TeamData[];

  constructor(private teamService: TeamService) { }

  async ngOnInit() {
    this.teams = await this.teamService.getRanking(5);
  }

}
