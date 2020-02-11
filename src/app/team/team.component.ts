import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from './team.service';
import { Title } from '@angular/platform-browser';
import { TeamInfo } from './team-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {
  startGameForm: FormGroup;

  globalConfig = this.configService.get('global');
  teamConfig = this.configService.get('team_param');

  teamInfo: TeamInfo;
  waitMinutes: number;

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
    private router: Router,
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

    if (!this.teamService.loginTeamIdValue) {
      console.log('セッション切れや〜');
      this.teamService.loginTeamId = Number(localStorage.getItem('teamId'));
    }
    this.teamInfo = await this.getTeamInfo(this.teamService.loginTeamIdValue);

    this.waitMinutes = this.calcWaitMinutes();
  }

  ngOnDestroy() {
   console.log('destroy called');
   this.teamService.loginTeamId = this.teamService.loginTeamIdValue;
  }

  /**
   * Calculate the wait time to play next game
   * TODO: 実装中
   */
  calcWaitMinutes(): number {
    // const lastGame = this.teamInfo.lastGameDate;
    const lastGame = '2019-12-02 23:24:41';
    const lastTime = new Date(lastGame);
    const nowTime  = new Date();
    const elapsedMin = Math.floor((nowTime.getTime() - lastTime.getTime()) / 60000);
    const waitMin = this.globalConfig.wait_minutes - elapsedMin;
    return this.globalConfig.wait_minutes > elapsedMin ? waitMin : 0;
  }

  /**
   * Confirm game
   */
  async confirmGame() {
    console.log('confirmGame() called!');
    console.log(this.startGameForm.value);

    // Save team data
    await this.teamService.updateTeam(this.startGameForm, this.teamService.loginTeamIdValue);

    // PlayBall
    await this.router.navigate(['/game'], { fragment: 'pageTop' });
  }

  /**
   * Open camp screen
   */
  goCamp() {
    console.log('coCamp() called!');

    // Check the camp times
  }

  /**
   * Delete the team (also delete user, player, pitcher and those relation data)
   */
  deleteTeam() {
    console.log('deleteTeam() called!');
  }

  /**
   * Get Team data, then generate data for team page
   * @param teamId Team ID
   */
  async getTeamInfo(teamId: number): Promise<TeamInfo> {
    const teamInfo: TeamInfo = await this.teamService.getTeam(teamId);

    if (teamInfo) {
      this.typeAttack.setValue(teamInfo.typeAttack);
      this.typeBunt.setValue(teamInfo.typeBunt);
      this.typeSteal.setValue(teamInfo.typeSteal);
      this.typeMind.setValue(teamInfo.typeMind);
    }

    return teamInfo;
  }
}
