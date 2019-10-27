import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-rank',
  templateUrl: './team-rank.component.html',
  styleUrls: ['./team-rank.component.css']
})
export class TeamRankComponent implements OnInit {
  teams = this.teamService.getRanking(5);

  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

}
