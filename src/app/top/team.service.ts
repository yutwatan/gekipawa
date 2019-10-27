import { Injectable } from '@angular/core';
import { TeamData } from './team-data';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() { }

  getRanking(num: number): TeamData[] {
    return [
      {
        icon: 'lions1.jpg',
        name: 'Team A',
        owner: '辻監督',
        game: 8 + 2,
        win: 8,
        lose: 2,
        save: 8 - 2,
        winAve: '.800',
        hr: 10,
        steal: 8,
        batAve: '.289',
        defAve: '2.88',
        restGame: 100 - (8 + 2),
        gameDiff: '2.0'
      },
      {
        icon: 'hawks3.jpg',
        name: 'Team B',
        owner: '辻監督',
        game: 8 + 2,
        win: 8,
        lose: 2,
        save: 8 - 2,
        winAve: '.800',
        hr: 10,
        steal: 8,
        batAve: '.289',
        defAve: '2.88',
        restGame: 100 - (8 + 2),
        gameDiff: '2.0'
      },
      {
        icon: 'marines1.jpg',
        name: 'Team C',
        owner: '辻監督',
        game: 8 + 2,
        win: 8,
        lose: 2,
        save: 8 - 2,
        winAve: '.800',
        hr: 10,
        steal: 8,
        batAve: '.289',
        defAve: '2.88',
        restGame: 100 - (8 + 2),
        gameDiff: '2.0'
      },
      {
        icon: 'buffaloes2.jpg',
        name: 'Team D',
        owner: '辻監督',
        game: 8 + 2,
        win: 8,
        lose: 2,
        save: 8 - 2,
        winAve: '.800',
        hr: 10,
        steal: 8,
        batAve: '.289',
        defAve: '2.88',
        restGame: 100 - (8 + 2),
        gameDiff: '2.0'
      },
      {
        icon: 'fighters1.jpg',
        name: 'Team E',
        owner: '辻監督',
        game: 8 + 2,
        win: 8,
        lose: 2,
        save: 8 - 2,
        winAve: '.800',
        hr: 10,
        steal: 8,
        batAve: '.289',
        defAve: '2.88',
        restGame: 100 - (8 + 2),
        gameDiff: '2.0'
      },
    ];
  }
}
