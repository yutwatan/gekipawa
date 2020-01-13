import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';

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

    try {
      return await this.http.post(url, body, options).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  /**
   * これ後で消す
   */
  async getGameResult(): Promise<any> {
    // TODO: Dummy
    return {
      topTeam: {
        score: 5,
        hit: 13,
        hr: 2,
        error: 0,
        team: {
          name: 'aaa',
        },
        owner: {
          name: 'AAA'
        },
        players: [
          {
            name: 'abc',
            batCount: 5,
            hit: 3,
            ave: '.600',
            hr: 1,
            totalHr: 2,
            batScore: 3,
            strikeOut: 1,
            fourBall: 1,
            bunt: 0,
            steal: 0,
            error: 0,
          },
          {
            name: 'abc',
            batCount: 5,
            hit: 3,
            ave: '.600',
            hr: 1,
            totalHr: 2,
            batScore: 3,
            strikeOut: 1,
            fourBall: 1,
            bunt: 0,
            steal: 0,
            error: 0,
          }
        ],
        pitcher: {
          name: 'cde',
          outCount: 27,
          lossScore: 2,
          hr: 1,
          hit: 3,
          strikeOut: 10,
          fourBall: 2,
          error: 0,
          win: 5,
          lose: 2,
        }
      },
      bottomTeam: {
        score: 2,
        hit: 3,
        hr: 0,
        error: 1,
        team: {
          name: 'ZZZ',
        },
        owner: {
          name: 'xxx'
        },
        players: [
          {
            name: 'ogj',
            batCount: 5,
            hit: 3,
            ave: '.600',
            hr: 1,
            totalHr: 2,
            batScore: 3,
            strikeOut: 1,
            fourBall: 1,
            bunt: 0,
            steal: 0,
            error: 0,
          },
          {
            name: 'fjo',
            batCount: 5,
            hit: 3,
            ave: '.600',
            hr: 1,
            totalHr: 2,
            batScore: 3,
            strikeOut: 1,
            fourBall: 1,
            bunt: 0,
            steal: 0,
            error: 0,
          }
        ],
        pitcher: {
          name: 'uuu',
          outCount: 24,
          lossScore: 5,
          hr: 1,
          hit: 13,
          strikeOut: 0,
          fourBall: 4,
          error: 0,
          win: 1,
          lose: 2,
        },
      }
    };
  }
}
