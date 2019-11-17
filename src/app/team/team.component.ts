import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  startGameForm: FormGroup;

  globalConfig = this.configService.get('global');

  teamData = this.getTeamData(1);

  typeAttack = new FormControl(this.teamData.typeAttack, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);
  typeBunt = new FormControl(this.teamData.typeBunt, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);
  typeSteal = new FormControl(this.teamData.typeSteal, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);
  typeMind = new FormControl(this.teamData.typeMind, [
    Validators.required,
    Validators.min(1),
    Validators.max(10),
    Validators.pattern(/\d{1,2}/)
  ]);

  constructor(
    private configService: ConfigService,
    private builder: FormBuilder,
  ) {
    this.startGameForm = this.builder.group({
      typeAttack: this.typeAttack,
      typeBunt: this.typeBunt,
      typeSteal: this.typeSteal,
      typeMind: this.typeMind,
    });
  }

  ngOnInit() {
  }

  confirmGame() {
    console.log('confirmGame() called!');
  }

  getTeamData(teamId) {
    // TODO: DB から取得したデータを使う
    return {
      teamName: 'Test team',
      owner: 'Onwer name',
      icon: 'lions2.png',
      typeAttack: 10,
      typeBunt: 2,
      typeSteal: 8,
      typeMind: 8,
      rank: 2,
      campTimes: 4,
      lastUpdated: '2019-11-16 22:54:53',
      stats: {
        win: 8,
        lose: 2,
        winAve: 8 * 1000 / 10,
        winContinue: 5,
        hitAve: '.287',
        loseScoreAve: '2.43',
        scoreAve: '5.21',
        hr: 10,
        steal: 7,
        strikeOut: 77,
        error: 2,
      },
      gameHistory: [
        {
          myScore: 5,
          otherTeamName: 'Team B',
          otherScore: 2,
          timestamp: '2019-11-16 22:22:22'
        }
      ]
    };
  }
}
