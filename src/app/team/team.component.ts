import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from './team.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  startGameForm: FormGroup;

  globalConfig = this.configService.get('global');

  teamInfo: any;

  typeAttack = new FormControl(5, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);
  typeBunt = new FormControl(5, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);
  typeSteal = new FormControl(5, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);
  typeMind = new FormControl(5, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);

  constructor(
    private configService: ConfigService,
    private builder: FormBuilder,
    private teamService: TeamService,
    private title: Title,
  ) {
    this.startGameForm = this.builder.group({
      typeAttack: this.typeAttack,
      typeBunt: this.typeBunt,
      typeSteal: this.typeSteal,
      typeMind: this.typeMind,
    });
  }

  async ngOnInit() {
    this.title.setTitle('チーム情報 - ' + this.globalConfig.site_title);
    this.teamInfo = await this.getTeamInfo(this.teamService.loginTeamIdValue);
  }

  confirmGame() {
    console.log('confirmGame() called!');
  }

  /**
   * Get Team data, then generate data for team page
   * @param teamId Team ID
   */
  async getTeamInfo(teamId) {
    const teamInfo: any = await this.teamService.getTeam(teamId);

    this.typeAttack.setValue(teamInfo.typeAttack);
    this.typeBunt.setValue(teamInfo.typeBunt);
    this.typeSteal.setValue(teamInfo.typeSteal);
    this.typeMind.setValue(teamInfo.typeMind);

    // TODO: DB から取得したデータを使う
    teamInfo.rank = 2;
    teamInfo.teamData.winAve = teamInfo.teamData.win * 1000 / (teamInfo.teamData.win + teamInfo.teamData.lose) || '000';
    teamInfo.teamData.hitAve = '287';
    teamInfo.teamData.loseScoreAve = '2.43';
    teamInfo.teamData.scoreAve = '5.21';
    teamInfo.gameHistory = [
      {
        myScore: 5,
        otherTeamName: 'Team B',
        otherScore: 2,
        timestamp: '2019-11-16 22:22:22'
      }
    ];

    return teamInfo;
  }
}
