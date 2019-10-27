import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentService {

  constructor() { }

  // ペナントの回数
  getTimes() {
    return 20;
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
}
