import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { CurrentService } from '../top/current.service';
import { GameService } from './game.service';
import { InningLogData } from './inning-result/inning-result.component';
import { InningResult } from './result/result.component';

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
  inningResults: TopBottomResult<InningData>[];

  constructor(
    private configService: ConfigService,
    private currentService: CurrentService,
    private gameService: GameService,
  ) { }

  async ngOnInit() {
    this.inningResults = [];

    const current = await this.currentService.getCurrent();
    this.championTeamId = current.team.id;
    this.continueWin = current.continueWin;

    await this.playBall();
  }

  /**
   * 試合開始
   */
  async playBall() {
    try {
      this.gameResults = await this.gameService.playBall(this.playTeamId, this.championTeamId);
    }
    catch (e) {
      console.log(e);
    }

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

export interface InningData {
  score: number;
  logData: InningLogData[];
}

export interface GameResults {
  gameLog: GameLog;
  gameRecord: TopBottomResult<GameRecord>;
  scoreBoard: TopBottomResult<number[]>;
  hitBoard: TopBottomResult<number[]>;
  outBoard: TopBottomResult<number[]>;
  inningRecords: TopBottomResult<any[]>;
  playerResults: TopBottomResult<BattingResult[]>;
  pitcherResult: TopBottomResult<PitchingResult>;
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

export interface GameRecord {
  score: number;
  hit: number;
  hr: number;
}

export interface BattingResult {
  box: number;
  atBat: number;
  hit: number;
  double: number;
  triple: number;
  hr: number;
  fourBall: number;
  strikeOut: number;
  batScore: number;
  sacrificeFly: number;
  bunt: number;
  steal: number;
  stealFailed: number;
  error: number;
  ave: string;
}

export interface PitchingResult {
  atBat: number;          // 対戦打数の合計
  hit: number;            // 被安打
  hr: number;             // 被本塁打
  fourBall: number;       // 与四球
  strikeOut: number;      // 奪三振
  wildPitch: number;
  outCount: number;       // 打ち取ったアウト数（イニング数の代わり）
  lossScore: number;      // 失点
  selfLossScore: number;  // 自責点
  defAve: string;         // 防御率
}

export interface TopBottomResult<T> {
  top: T;
  bottom: T;
}
