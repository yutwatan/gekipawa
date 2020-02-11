import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { sprintf } from 'sprintf-js';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private backendApiConfig = this.configService.get('backend_api');

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) { }

  /**
   * PlayBall, then save the game result data
   * @param topTeamId Top team ID
   * @param bottomTeamId Bottom team ID
   */
  async playBall(topTeamId: number, bottomTeamId: number): Promise<any> {
    const url = this.backendApiConfig.baseurl + '/playBall';
    const body = {    // NOTE: こんな書き方できるのね
      topTeamId,
      bottomTeamId,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return await this.http.post(url, body, options).toPromise();
  }

  /**
   * 打率の計算
   *
   * @param hit ヒット数
   * @param atBat 打数
   */
  calcAverage(hit: number, atBat: number) {
    if (hit === 0) {
      return '.000';
    }

    if (hit / atBat === 1) {
      return '1.000';
    }

    return sprintf('%.03f', hit / atBat).slice(1);
  }

  /**
   * 防御率の計算
   *
   * @param loseScore 自責点
   * @param outCount アウト数
   */
  calcDefenseAverage(loseScore: number, outCount: number) {
    if (loseScore === 0) {
      return '0.00';
    }
    else {
      return sprintf('%.2f', loseScore * 9 * 3 / outCount);
    }
  }
}


