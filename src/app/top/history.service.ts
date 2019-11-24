import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { History } from './history';
import { News } from './news';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private backendApiConfig = this.configService.get('backend_api');

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
  ) { }

  getNewsAndComments(num: number): News[] {
    return [
      {
        type: 1,
        message: '◯◯がノーヒットノーラン！',
        owner: null,
        topTeam: 'TEAM KK',
        topScore: 0,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
      {
        type: 2,
        message: 'よっしゃ！',
        owner: '原監督',
        topTeam: 'TEAM KK',
        topScore: 0,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
      {
        type: 2,
        message: 'よっしゃ！',
        owner: '原監督',
        topTeam: 'TEAM KK',
        topScore: 0,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
      {
        type: 2,
        message: 'よっしゃ！',
        owner: '原監督',
        topTeam: 'TEAM KK',
        topScore: 0,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
      {
        type: 1,
        message: '◯◯がノーヒットノーラン！',
        owner: null,
        topTeam: 'TEAM KK',
        topScore: 0,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
      {
        type: 1,
        message: '◯◯がノーヒットノーラン！',
        owner: null,
        topTeam: 'TEAM KK',
        topScore: 0,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
      {
        type: 2,
        message: 'よっしゃ！',
        owner: '原監督',
        topTeam: 'TEAM KK',
        topScore: 0,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
      {
        type: 2,
        message: 'よっしゃ！',
        owner: '原監督',
        topTeam: 'TEAM KK',
        topScore: 0,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
      {
        type: 1,
        message: '◯◯がノーヒットノーラン！',
        owner: null,
        topTeam: 'TEAM KK',
        topScore: 0,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
      {
        type: 1,
        message: '◯◯がノーヒットノーラン！',
        owner: null,
        topTeam: 'TEAM KK',
        topScore: 0,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
    ];
  }

  /**
   * Get recently 5 games
   * @param num 5
   * @param times times for pennant
   */
  async getRecentlyGames(num: number, times: number): Promise<History[]> {
    const url = this.backendApiConfig.baseurl + '/gameLogs' +
      '?times=' + times + '&limit=' + num;
    const recentlyGames = [];

    try {
      const gameLogs: any = await this.http.get(url).toPromise();

      for (const gameLog of gameLogs) {
        recentlyGames.push({
          topTeam: gameLog.topTeam.name,
          topScore: gameLog.topScore,
          bottomTeam: gameLog.botTeam.name,
          bottomScore: gameLog.botScore,
          time: gameLog.playDate,
        });
      }
    }
    catch (e) {
      console.log(e);
    }

    return recentlyGames;
  }
}
