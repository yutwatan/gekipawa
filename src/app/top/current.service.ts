import { Injectable } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { sprintf } from 'sprintf-js';
import { Champion } from './now-champion/champion';

@Injectable({
  providedIn: 'root'
})
export class CurrentService {
  private times = 0;
  private backendApiConfig = this.configService.get('backend_api');
  private globalConfig = this.configService.get('global');
  private playerCondition = ['最悪', '悪い', '普通', '良い', '絶好'];

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) { }

  // ペナントの回数
  async getTimes() {
    if (this.times > 0) {
      return this.times;
    }

    const url = this.backendApiConfig.baseurl + '/current';

    try {
      const result: any = await this.http.get(url).toPromise();

      if (result.length !== 1) {
        const startDay = this._getStartDay();
        const endDay = this._getEndDay(startDay);
        const timesInfo = {
          times: 1,
          startTime: startDay,
          endTime: endDay,
        };
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };

        await this.http.post(url, timesInfo, options).toPromise();
        this.times = 1;
      }
      else {
        this.times = result[0].times;
      }

      return this.times;
    }
    catch (e) {
      console.log(e);
    }
  }

  getTermDay() {
    return 2;
  }

  async getCurrent(): Promise<any> {
    const url = this.backendApiConfig.baseurl + '/current';
    let current: any;

    try {
      const result: any = await this.http.get(url).toPromise();
      current = result[0];
    }
    catch (e) {
      console.log(e);
    }

    return current;
  }

  async getChampionInfo(): Promise<Champion> {
    const current: any = await this.getCurrent();

    let pitcher: any;
    let pitcherData: any;

    if (current.team) {
      pitcher = this.sortPitcher(current.team.pitchers, 'order', 'asc')[0];
      pitcherData = this.sortPitcher(pitcher.pitchingData, 'times', 'desc')[0];
    }

    return {
      team: current.team ? current.team.name : '該当なし',
      owner: current.team ? current.team.user.name : '該当なし',
      icon: current.team ? current.team.icon : 'brand_icon.png',
      continuousWin: current.continueWin || 0,
      nextPitcher: {
        name: pitcher ? pitcher.name : '-',
        win: pitcherData ? pitcherData.win : 0,
        lose: pitcherData ? pitcherData.lose : 0,
        defAve: pitcherData ? this.calcDefenseAverage(pitcherData.lossScore, pitcherData.outCount) : '-',
        condition: pitcher ? this.playerCondition[pitcher.condition - 1] : '-'
      }
    };
  }

  calcDefenseAverage(loseScore: number, outCount: number) {
    if (loseScore === 0) {
      return '0.00';
    }
    else {
      return sprintf('%.2f', loseScore * 9 * 3 / outCount);
    }
  }

  sortPitcher(pitchers: any, key: string, order: string) {
    return pitchers.sort((a, b) => {
      if (a[key] === b[key]) {
        return 0;
      }
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      }
      else {
        return a[key] > b[key] ? -1 : 1;
      }
    });
  }

  _getStartDay() {
    const baseHour = this.globalConfig.base_hour;

    const date = new Date();
    date.setHours(baseHour);
    date.setMinutes(0);
    date.setSeconds(0);

    return formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en-US', 'JST');
  }

  _getEndDay(startDate: string) {
    const gameTerm = this.globalConfig.game_term;

    const date = new Date(startDate);
    date.setDate(date.getDate() + gameTerm);

    return formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en-US', 'JST');
  }
}
