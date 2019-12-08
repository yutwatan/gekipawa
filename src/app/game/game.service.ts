import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

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

  async getInningResults(): Promise<any[]> {
    const inningResults = [];

    // TODO: Dummy
    for (let i = 0; i < 9; i++) {
      inningResults.push({
        top: {
          score: 2,
          hit: 3,
          logData: [
            {
              order: 1,
              player: {
                name: 'aaa'
              },
              result: 'ゴロ',
              outCount: 1,
              runner: '000',
            },
            {
              order: 2,
              player: {
                name: 'bbb'
              },
              result: 'ゴロ',
              outCount: 2,
              runner: '000',
            },
            {
              order: 3,
              player: {
                name: 'ccc'
              },
              result: 'ゴロ',
              outCount: 3,
              runner: '000',
            },
          ]
        },
        bottom: {
          score: 2,
          hit: 3,
          logData: [
            {
              order: 1,
              player: {
                name: 'aaa'
              },
              result: 'ゴロ',
              outCount: 1,
              runner: '000',
            },
            {
              order: 1,
              player: {
                name: 'aaa'
              },
              result: 'ゴロ',
              outCount: 2,
              runner: '000',
            },
            {
              order: 1,
              player: {
                name: 'aaa'
              },
              result: 'ゴロ',
              outCount: 3,
              runner: '000',
            },
          ]
        },
      });
    }

    return inningResults;
  }
}
