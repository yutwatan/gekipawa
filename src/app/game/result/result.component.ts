import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TeamService } from '../../team/team.service';
import { TeamInfo } from '../../team/team-info';
import { BattingResult, GameRecord, GameResults, PitchingResult, TopBottomResult } from '../game.component';
import { GameService } from '../game.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnChanges {
  @Input() topTeamId: number;
  @Input() botTeamId: number;
  @Input() gameResults: GameResults;

  topTeamInfo: TeamInfo;
  botTeamInfo: TeamInfo;
  winTeam: string;
  winLose: TopBottomResult<string>;
  gameRecord: TopBottomResult<GameRecord>;
  scoreBoard: TopBottomResult<number[]>;
  hitBoard: TopBottomResult<number[]>;
  // inningRecords: TopBottomResult<InningResult[][]>;

  playerResult: TopBottomResult<BattingResult[]>;
  pitcherResult: TopBottomResult<PitchingResult>;
  playerResultSum: TopBottomResult<PlayerResult>;
  hitSum: TopBottomResult<number>;
  errorSum: TopBottomResult<number>;
  hrData: TopBottomResult<HomeRunData[]>;

  constructor(
    private teamService: TeamService,
    private gameService: GameService,
  ) { }

  async ngOnInit() {
    this.winTeam = '';
    this.hrData  = { top: [], bottom: [] };
    this.winLose = { top: '', bottom: '' };
    /*
    this.playerResult  = { top: [], bottom: [] };
    this.pitcherResult = {
      top: this.initPitcherData(undefined),
      bottom: this.initPitcherData(undefined),
    };
     */
    this.playerResultSum = {
      top: this.initPlayerData(undefined),
      bottom: this.initPlayerData(undefined),
    };
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.botTeamId) {
      this.botTeamId = changes.botTeamId.currentValue;

      if (this.botTeamId) {
        this.botTeamInfo = await this.teamService.getTeam(this.botTeamId);
      }
    }

    if (changes.topTeamId) {
      this.topTeamId = changes.topTeamId.currentValue;

      if (this.topTeamId) {
        this.topTeamInfo = await this.teamService.getTeam(this.topTeamId);
      }
    }

    if (changes.gameResults) {
      this.gameResults = changes.gameResults.currentValue;

      if (this.gameResults) {
        this.gameRecord = this.gameResults.gameRecord;
        this.scoreBoard = this.gameResults.scoreBoard;
        this.hitBoard = this.gameResults.hitBoard;
        this.playerResult = this.gameResults.playerResults;
        this.pitcherResult = this.gameResults.pitcherResult;

        this.calculateAverage();
        this.sumHit();
        this.sumError();
        this.getPlayerResult();
        this.sumPlayerResult();
      }
    }

    if (this.topTeamInfo && this.botTeamInfo && this.gameResults) {
      this.decideWinTeam();
    }
  }

  sumPlayerResult(): void {
    this.playerResultSum.top    = this.sumPlayerData('top');
    this.playerResultSum.bottom = this.sumPlayerData('bottom');
  }

  /**
   * 選手の記録の合計
   */
  sumPlayerData(topBottom: string): PlayerResult {
    const sumPlayerData = this.initPlayerData(undefined);

    for (const player of this.playerResult[topBottom]) {
      sumPlayerData.atBat += player.atBat;
      sumPlayerData.hit += player.hit;
      sumPlayerData.hr += player.hr;
      sumPlayerData.batScore += player.batScore;
      sumPlayerData.strikeOut += player.strikeOut;
      sumPlayerData.fourBall += player.fourBall;
      sumPlayerData.bunt += player.bunt;
      sumPlayerData.steal += player.steal;
      sumPlayerData.error += player.error;
    }

    const teamInfo = topBottom === 'top' ? this.topTeamInfo : this.botTeamInfo;
    let teamHit = 0;
    let teamAtBat = 0;
    let teamHr = 0;
    for (const player of teamInfo.players) {
      teamHit += player.hit;
      teamAtBat += player.atBat;
      teamHr += player.hr;
    }
    teamHit += sumPlayerData.hit;
    teamAtBat += sumPlayerData.atBat;

    sumPlayerData.ave = this.gameService.calcAverage(teamHit, teamAtBat);
    sumPlayerData.totalHr = sumPlayerData.hr + teamHr;

    return sumPlayerData;
  }

  /**
   * 打率＆防御率の計算
   */
  calculateAverage() {
    this.calculateBatAverage('top');
    this.calculateBatAverage('bottom');

    this.calculateDefAverage('top');
    this.calculateDefAverage('bottom');
  }

  /**
   * 打率計算
   */
  calculateBatAverage(topBottom: string) {
    const teamInfo = topBottom === 'top' ? this.topTeamInfo : this.botTeamInfo;

    for (let i = 0; i < this.playerResult[topBottom].length; i++) {
      const currentHit = teamInfo.players[i].hit;
      const gameHit = this.playerResult[topBottom][i].hit;
      const hit = currentHit + gameHit;

      const currentAtBat = teamInfo.players[i].atBat;
      const gameAtBat = this.playerResult[topBottom][i].atBat;
      const atBat = currentAtBat + gameAtBat;

      this.playerResult[topBottom][i].ave = this.gameService.calcAverage(hit, atBat);
    }
  }

  /**
   * 防御率計算
   */
  calculateDefAverage(topBottom: string) {
    const teamInfo = topBottom === 'top' ? this.topTeamInfo : this.botTeamInfo;

    const currentSelfLossScore = teamInfo.pitchers[0].selfLossScore;
    const gameSelfLossScore = this.pitcherResult[topBottom].selfLossScore;
    const selfLossScore = currentSelfLossScore + gameSelfLossScore;

    const currentOutCount = teamInfo.pitchers[0].outCount;
    const gameOutCount = this.pitcherResult[topBottom].outCount;
    const outCount = currentOutCount + gameOutCount;

    this.pitcherResult[topBottom].defAve = this.gameService.calcDefenseAverage(selfLossScore, outCount);
  }

  /**
   * 配列の合計値を計算
   * @param array 合計値を求める元配列
   */
  private sum(array: number[]): number {
    // tslint:disable-next-line:no-shadowed-variable
    return array.reduce((prev: number, current: number, i: number, array: number[]) => {
      return prev + current;
    });
  }

  /**
   * ヒットの合計値を計算
   */
  private sumHit(): void {
    this.hitSum = {
      top: this.sum(this.hitBoard.top),
      bottom: this.sum(this.hitBoard.bottom),
    };
  }

  // TODO: Server Side でサマったデータを作ったほうが良さげ（このとり方は現実的ではない）
  private sumError(): void {
    const sum = {
      top: 0,
      bottom: 0
    };

    this.errorSum = sum;
  }

  /**
   * inningRecords から選手の成績データを抽出
   */
  private getPlayerResult(): void {
    for (const inningResult of this.gameResults.inningRecords.top) {
      this.getPlayerData(inningResult, 'top');
    }

    for (const inningResult of this.gameResults.inningRecords.bottom) {
      this.getPlayerData(inningResult, 'bottom');
    }
  }

  /**
   * 選手のさまざまな成績データを抽出
   */
  private getPlayerData(battingResults: InningResult[], topBottom: string): void {

    for (const batBox of battingResults) {

      // ホームラン
      if (batBox.hr) {
        this.hrData[topBottom].push({
          playerName: batBox.player.name,
          hrCount: batBox.player.hr,
        });
      }
    }
  }

  private initPlayerData(currentData: PlayerResult): PlayerResult {
    if (typeof currentData !== 'undefined') {
      return currentData;
    }
    else {
      return {
        name: '',
        position: '',
        atBat: 0,
        hit: 0,
        hr: 0,
        batScore: 0,
        strikeOut: 0,
        fourBall: 0,
        bunt: 0,
        ave: '',
        totalHr: 0,
        error: 0,
        steal: 0,
      };
    }
  }

  private decideWinTeam(): void {
    const topScore = this.gameRecord.top.score;
    const bottomScore = this.gameRecord.bottom.score;
    const topTeamName = this.topTeamInfo.name;
    const botTeamName = this.botTeamInfo.name;

    if (topScore > bottomScore) {
      this.winTeam = topTeamName;
      this.winLose.top = '勝';
      this.winLose.bottom = '負';
      this.topTeamInfo.win++;
      this.botTeamInfo.lose++;
    }
    else {
      this.winTeam = botTeamName;
      this.winLose.top = '負';
      this.winLose.bottom = '勝';
      this.topTeamInfo.lose++;
      this.botTeamInfo.win++;
    }
  }
}

export interface InningResult {
  player: Batter;        // 打者 or ランナー（steal = true の場合は 1st ランナー）
  pitcher: Pitcher;       // 対戦投手
  defender: Player[];     // 打球を処理した人
  runner: number;         // このタイミングでのランナー（3bit 表記）
  order: number;          // 打順
  atBat: number;          // 打数（打数カウントしない場合は 0）
  hit: number;            // ここは投手と打者、両方の記録に使う
  hitKind: string;        // 1塁打(single)、2塁打(double)、3塁打(triple)、のいずれか
  hr: number;             // ここは投手と打者、両方の記録に使う
  fourBall: number;       // ここは投手と打者、両方の記録に使う
  strikeOut: number;      // ここは投手と打者、両方の記録に使う
  batScore: number;       // 打点
  bunt: string;
  outCount: number;       // イニング内におけるアウトカウント
  out: number;            // 通常は 0 or 1 だが、併殺の場合は 2 になる
  error: boolean;         // defender のエラー
  steal: string;          // 注意） バッターの盗塁ではなく、1塁ランナーの盗塁
  wildPitch: boolean;
  selfLossScore: number;  // 自責点
  plusScore: number;      // 追加点（打点は問わない）
  wallOff: boolean;       // サヨナラゲーム
}

export interface PlayerResult {
  name: string;
  position: string;
  atBat: number;
  hit: number;
  hr: number;
  batScore: number;
  strikeOut: number;
  fourBall: number;
  bunt: number;
  steal: number;
  error: number;
  ave: string;
  totalHr: number;
}

export interface PitcherResult {
  name: string;           // 投手名
  atBat: number;          // 対戦打席数
  hit: number;            // 被安打
  hr: number;             // 被本塁打
  strikeOut: number;      // 奪三振
  fourBall: number;       // 与四球
  lossScore: number;      // 失点
  selfLossScore: number;  // 自責点
  error: number;          // エラー（暴投）
  defAve: string;         // 防御率
}

export interface Batter {
  order: number;
  name: string;
  position: string;
  hr: number;
  hit: number;
  strikeOut: number;
  fourBall: number;
  bunt: number;
  error: number;
}

export interface Pitcher {
  order: number;
  name: string;
  win: number;
  lose: number;
  strikeOut: number;
  fourBall: number;
  error: number;
}

export interface Player {
  order: number;
  name: string;
  hr: number;
  hit: number;
  strikeOut: number;
  fourBall: number;
  error: number;
}

interface HomeRunData {
  playerName: string;
  hrCount: number;
}
