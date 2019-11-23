import { Injectable } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CurrentService {
  private times = 0;
  private backendApiConfig = this.configService.get('backend_api');
  private globalConfig = this.configService.get('global');

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

  getChampionInfo() {
    return {
      team: 'Team AA',
      owner: '渡邊監督',
      icon: 'lions3.gif',
      continuousWin: 7,
      nextPitcher: {
        name: '増田達至',
        win: 8,
        lose: 2,
        defAve: '3.12',
        condition: 'Good'
      }
    };
  }

  _getStartDay() {
    const baseHour = this.globalConfig.base_hour;

    const date = new Date();
    date.setHours(baseHour);
    date.setMinutes(0);
    date.setSeconds(0);

    return formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en', 'JST');
  }

  _getEndDay(startDate: string) {
    const gameTerm = this.globalConfig.game_term;

    const date = new Date(startDate);
    date.setDate(date.getDate() + gameTerm);

    return formatDate(date, 'yyyy/MM/dd HH:mm:ss', 'en', 'JST');
  }
}
