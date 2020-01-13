import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { CurrentService } from '../top/current.service';
import { GameService } from './game.service';
import { PlayResult } from './inning-result/inning-result.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  globalConfig = this.configService.get('global');
  playTeamId: number = Number(localStorage.getItem('teamId'));
  championTeamId: number;
  continueWin: number;
  gameResults: GameResults;
  inningResults: InningResult[];

  constructor(
    private configService: ConfigService,
    private currentService: CurrentService,
    private gameService: GameService,
  ) { }

  async ngOnInit() {
    const current: any = await this.currentService.getCurrent();
    this.championTeamId = current.team.id;
    this.continueWin = current.continueWin;

    await this.playBall();
  }

  /**
   * 試合開始
   */
  async playBall() {
    this.gameResults = await this.gameService.playBall(this.playTeamId, this.championTeamId);

    // TODO: for DEBUG
    console.log(this.gameResults);

    let topScore = 0;
    let botScore = 0;

    // 結果のデータ整形
    for (let i = 0; i < this.gameResults.inningRecords.top.length; i++) {
      topScore += this.gameResults.scoreBoard.top[i];
      const topLogData = this.gameResults.inningRecords.top[i];

      let botLogData;
      if (i < this.gameResults.inningRecords.bottom.length) {
        botScore += this.gameResults.scoreBoard.bottom[i];
        botLogData = this.gameResults.inningRecords.bottom[i];
      }
      else {
        botLogData = [];
      }

      this.inningResults.push({
        top: {
          score: topScore,
          logData: topLogData,
        },
        bottom: {
          score: botScore,
          logData: botLogData,
        },
      });
    }
  }
}

export interface InningResult {
  top: InningData;
  bottom: InningData;
}

export interface InningData {
  score: number;
  logData: any[];
}

export interface GameResults {
  gameLog: GameLog;
  scoreBoard: TopBottomResult<number[]>;
  hitBoard: TopBottomResult<number[]>;
  outBoard: TopBottomResult<number[]>;
  inningRecords: TopBottomResult<any[]>;
  score: TopBottomResult<number>;
  wallOff: boolean;
}

export interface GameLog {
  times: number;
  topTeam: number;
  botTeam: number;
  topScore: number;
  botScore: number;
  playDate: Date;
  active: boolean;
  created: Date;
  updated: Date;
  id: string;
}

export interface TopBottomResult<T> {
  top: T;
  bottom: T;
}
