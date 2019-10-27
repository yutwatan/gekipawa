import { Injectable } from '@angular/core';
import { History } from './history';
import { News } from './news';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }

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

  getRecentlyGames(num: number): History[] {
    return [
      {
        topTeam: 'TEAM BB',
        topScore: 5,
        bottomTeam: 'TEAM CC',
        bottomScore: 9,
        time: '2019-07-14 17:37:32'
      },
      {
        topTeam: 'TEAM BB',
        topScore: 5,
        bottomTeam: 'TEAM CC',
        bottomScore: 9,
        time: '2019-07-14 17:37:32'
      },
      {
        topTeam: 'TEAM BB',
        topScore: 5,
        bottomTeam: 'TEAM CC',
        bottomScore: 9,
        time: '2019-07-14 17:37:32'
      },
      {
        topTeam: 'TEAM BB',
        topScore: 5,
        bottomTeam: 'TEAM CC',
        bottomScore: 9,
        time: '2019-07-14 17:37:32'
      },
      {
        topTeam: 'TEAM KK',
        topScore: 2,
        bottomTeam: 'TEAM UU',
        bottomScore: 4,
        time: '2019-07-19 17:37:32'
      },
    ];
  }
}
