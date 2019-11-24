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

  /**
   * Get recently 10 comments or news
   * @param num 10
   */
  async getNewsAndComments(num: number): Promise<News[]> {
    const url = this.backendApiConfig.baseurl + '/commentNews?limit=' + num;
    const newsAndComments = [];

    try {
      const commentNews: any = await this.http.get(url).toPromise();

      for (const item of commentNews) {
        newsAndComments.push({
          type: item.kind,
          message: item.comment,
          owner: item.user === null ? null : item.user.name,
          topTeam: item.gameLog.topTeam.name,
          topScore: item.gameLog.topScore,
          bottomTeam: item.gameLog.botTeam.name,
          bottomScore: item.gameLog.botScore,
          time: item.commentDate,
        });
      }
    }
    catch (e) {
      console.log(e);
    }

    return newsAndComments;
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
