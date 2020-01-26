import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InningData, TopBottomResult } from '../game.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-inning-result',
  templateUrl: './inning-result.component.html',
  styleUrls: ['./inning-result.component.css']
})
export class InningResultComponent implements OnInit, OnChanges {
  @Input() topBottom: string;
  @Input() inningResult: TopBottomResult<InningData>;
  @Input() inning: number;

  inningData: InningData;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.inningResult) {
      this.inningResult = changes.inningResult.currentValue;

      if (this.inningResult) {
        this.inningData = this.inningResult[this.topBottom];
        this.inningData.logData = this.getBattingResult(this.inningData.logData);
      }
    }
  }

  /**
   * 試合の経過用
   * @param battingRecords バッティング結果
   */
  getBattingResult(battingRecords: any): InningLogData[] {
    const gameResults: InningLogData[] = [];

    for (const batting of battingRecords) {
      gameResults.push({
        order: this.isStealOrWildPitch(batting) ? '' : (batting.order === 0 ? 9 : batting.order),
        name: this.isStealOrWildPitch(batting) ? '' : batting.player.name,
        logText: this.getLogText(batting),
        runner: this.getRunner(batting.runner),
        outCount: this.getOutCount(batting.outCount),
      });
    }

    return gameResults;
  }

  /**
   * バッティング結果
   * @param battingData バッティング結果のデータ
   */
  getLogText(battingData) {
    let logText = '';

    if (battingData.steal !== '') {
      const suffix = battingData.steal === 'succeed' ? '成功' : '失敗＼(^o^)／';
      return battingData.player.name + ' 盗塁' + suffix;
    }
    else if (battingData.strikeOut) {
      return '三振';
    }
    else if (battingData.wildPitch) {
      logText = '暴投';
    }
    else if (battingData.fourBall) {
      logText = '四球';
    }

    // ヒット
    else if (battingData.hit > 0) {
      switch (battingData.hitKind) {
        case 'homerun':
          logText = 'ホームラン！！';
          break;
        case 'triple':
          logText = '三塁打！';
          break;
        case 'double':
          logText = '二塁打';
          break;
        default:
          logText = 'ヒット';
          break;
      }
    }

    // アウト
    else if (!battingData.error) {
      logText = 'アウト';
    }

    // エラー発生時
    if (battingData.error) {
      logText += ' ' + battingData.defender[battingData.defender.length - 1].position + ' エラー';
    }

    // 得点時
    if (battingData.plusScore) {
      if (battingData.fourBall) {
        logText += '<br>押し出し';
      }
      logText += ' ' + battingData.plusScore + '点追加！';
    }

    // サヨナラ時
    if (battingData.wallOff) {
      logText += '<br>サヨナラ！！！';
    }

    return logText;
  }

  /**
   * ランナー表示
   * @param runner ランナー（2bit 表記）
   */
  getRunner(runner: number): SafeHtml {
    let strRunner = ('000' + runner).slice(-3);
    strRunner = strRunner.replace(/1/g, '◆');
    strRunner = strRunner.replace(/0/g, '◇');
    const runners = strRunner.split('');
    return this.domSanitizer.bypassSecurityTrustHtml(
      '<div>' + runners[1] + '</div><div style="line-height: 0; padding-bottom: 10px">' +
      runners[0] + runners[2] + '</div>'
    );
  }

  /**
   * アウト表示
   * @param outCount アウトカウント
   */
  getOutCount(outCount: number): string {
    switch (outCount) {
      case 3:
        return '●●●';
      case 2:
        return '●●◯';
      case 1:
        return '●◯◯';
      default:
        return '◯◯◯';
    }
  }

  /**
   * 盗塁 or 暴投のチェック （＝バッティングなし）
   * @param battingData バッティング結果
   */
  isStealOrWildPitch(battingData) {
    return (battingData.steal !== '' || battingData.wildPitch);
  }
}

export interface InningLogData {
  order: number;
  name: string;
  logText: string;
  runner: SafeHtml;
  outCount: string;
}
