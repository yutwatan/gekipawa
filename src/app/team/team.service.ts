import { Injectable } from '@angular/core';
import { TeamData } from './team-data';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { sprintf } from 'sprintf-js';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private playerNames = [];
  private positions = [];
  private regenerateTimes = 0;
  private existTeams: any = [];
  private teamId = 0;

  backendApiConfig = this.configService.get('backend_api');
  globalConfig = this.configService.get('global');

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) { }

  set loginTeamId(teamId: number) {
    this.teamId = teamId;
  }

  set playerName(playerObj: {index: number, playerName: string}) {
    this.playerNames[playerObj.index] = playerObj.playerName;
  }

  set position(playerObj: {index: number, playerPosition: string}) {
    this.positions[playerObj.index] = playerObj.playerPosition;
  }

  get loginTeamIdValue(): number {
    return this.teamId;
  }

  get playerNamesData(): string[] {
    return this.playerNames;
  }

  clearPlayerNames() {
    this.playerNames = [];
    this.regenerateTimes = 0;
  }

  generatePlayerName(role: string): string {
    const playerNames = [
      '中村剛也', '秋山翔吾', '源田壮亮', '森友哉', '栗山巧',
      '山川穂高', '外崎修汰', '木村文紀', '金子侑司', '内川聖一',
      '長谷川勇也', '柳田悠岐', '中田翔', 'メヒア', '吉田正尚',
      '茂木栄五郎', '浅村栄斗', '角中勝也', '山田哲人', '坂本勇人',
      '熊代聖人', '永江恭平', '松田宣浩', '上林誠知', '甲斐拓也',
    ];
    const pitcherNames = [
      '高橋光成', '十亀剣', '松本航', '増田達至', '高橋朋己',
      '大石達也', '岸孝之', '松坂大輔', '相内誠', '小川龍也',
      '今井達也', '平井克典', '小石博孝', '佐野泰雄', '森唯斗',
      '平井克典'
    ];

    let name = '';
    if (role === 'player') {
      name = playerNames[Math.floor(Math.random() * playerNames.length)];
    }
    else {
      name = pitcherNames[Math.floor(Math.random() * pitcherNames.length)];
    }

    if (this.playerNames.includes(name) && this.regenerateTimes < 10) {
      this.regenerateTimes++;
      name = this.generatePlayerName(role);
    }
    else {
      if (this.regenerateTimes >= 10) {
        console.log('10 times');
      }
      this.playerNames.push(name);
    }

    return name;
  }

  calcSum(playerData, kind): number {
    if (kind === 'player') {
      return (
        +(playerData.get('power').value) +
        +(playerData.get('meet').value)  +
        +(playerData.get('run').value)   +
        +(playerData.get('defense').value)
      );
    }
    else if (kind === 'pitcher') {
      return (
        +(playerData.get('speed').value)   +
        +(playerData.get('change').value)  +
        +(playerData.get('control').value) +
        +(playerData.get('defense').value)
      );
    }
  }

  calcTeamParams(players, farmPlayers, pitchers) {
    const params = {
      total: 0,
      param10: 0,
      param8and9: 0
    };

    // Check params for regular players and bench players
    for (const allPlayers of [players, farmPlayers]) {
      for (const playerData of allPlayers) {
        params.total += +(playerData.get('playerSum').value);

        for (const paramKind of ['power', 'meet', 'run', 'defense']) {
          if (this.checkParam10(playerData, paramKind)) {
            params.param10++;
          }

          if (this.checkParam8and9(playerData, paramKind)) {
            params.param8and9++;
          }
        }
      }
    }

    // Check params for pitchers
    for (const playerData of pitchers) {
      params.total += +(playerData.get('playerSum').value);

      for (const paramKind of ['speed', 'change', 'control', 'defense']) {
        if (this.checkParam10(playerData, paramKind)) {
          params.param10++;
        }

        if (this.checkParam8and9(playerData, paramKind)) {
          params.param8and9++;
        }
      }
    }

    return params;
  }

  checkParam10(playerData, paramKind): boolean {
    return  playerData.get(paramKind).value  === '10';
  }

  checkParam8and9(playerData, paramKind): boolean {
    return playerData.get(paramKind).value === '8' || playerData.get(paramKind).value === '9';
  }

  duplicatePlayerNameValidator(addTeamForm): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const playerNames = [];
      const playerData  = addTeamForm.get('playerDataArray');
      const farmData    = addTeamForm.get('farmPlayerDataArray');
      const pitcherData = addTeamForm.get('pitcherDataArray');

      for (const player of playerData.controls) {
        playerNames.push(player.value.playerName);
      }
      for (const farmPlayer of farmData.controls) {
        playerNames.push(farmPlayer.value.playerName);
      }
      for (const pitcher of pitcherData.controls) {
        playerNames.push(pitcher.value.playerName);
      }

      const duplicate = playerNames.includes(control.value);
      return duplicate ? {message: control.value} : null;
    };
  }

  duplicatePlayerPositionValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const duplicate = this.positions.includes(control.value);
      return duplicate ? {message: control.value} : null;
    };
  }

  teamAlreadyExistValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      for (const teamInfo of this.existTeams) {
        if (teamInfo.name === control.value) {
          const errorMessage = 'チーム名「' + control.value +
            '」は既に登録されています。他の名前に変更が必要です。';
          return {message: errorMessage};
        }
      }
      return null;
    };
  }

  userAlreadyExistValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      for (const teamInfo of this.existTeams) {
        if (teamInfo.user.name === control.value) {
          const errorMessage = '監督名「' + control.value +
            '」は既に登録されています。他の名前に変更が必要です。';
          return {message: errorMessage};
        }
      }
      return null;
    };
  }

  /**
   * Sort all teams for ranking
   * order1: win(desc), order2: lose(asc)
   */
  sortTeam() {
    return this.existTeams.sort((a, b) => {
      const x = a.teamData.win;
      const y = b.teamData.win;

      // 勝が一緒なら負が少ないほうが上位
      if (x === y) {
        const s = a.teamData.lose;
        const t = b.teamData.lose;

        if (s === t) {
          return 0;
        }
        return x > y ? 1 : -1;
      }

      return x > y ? -1 : 1;
    });
  }

  calcAverage(a: number, b: number) {
    if (a === 0) {
      return '.000';
    }

    if (a / (a + b) === 1) {
      return '1.000';
    }

    return sprintf('%.03f', a / (a + b)).slice(1);
  }

  calcDefenseAverage(loseScore: number, outCount: number) {
    if (loseScore === 0) {
      return '0.00';
    }
    else {
      return sprintf('%.2f', loseScore * 9 * 3 / outCount);
    }
  }

  async getRanking(num: number): Promise<TeamData[]> {
    await this.getAllTeams();
    const sortedTeams = this.sortTeam();

    const teamRank = [];
    let prevSave = 0;
    let headSave = 0;

    for (const teamInfo of sortedTeams) {
      const winNum = teamInfo.teamData.win;
      const loseNum = teamInfo.teamData.lose;
      let diffGame = '-';
      let diffGameHead = '-';

      // 首位と２位以降
      if (teamRank.length === 0) {
        headSave = winNum - loseNum;
      }
      else {
        diffGame = sprintf('%.1f', (prevSave - (winNum - loseNum)) / 2);
        diffGameHead = sprintf('%.1f', (headSave - (winNum - loseNum)) / 2);
      }

      teamRank.push({
        icon: teamInfo.icon,
        name: teamInfo.name,
        owner: teamInfo.user.name,
        game: winNum + loseNum,
        win: winNum,
        lose: loseNum,
        save: winNum - loseNum,
        winAve: this.calcAverage(winNum, loseNum),
        hr: teamInfo.teamData.hr,
        steal: teamInfo.teamData.steal,
        batAve: this.calcAverage(teamInfo.teamData.hit, teamInfo.teamData.atBat),
        defAve: this.calcDefenseAverage(teamInfo.teamData.lossScore, teamInfo.teamData.outCount),
        restGame: this.globalConfig.max_game - (winNum + loseNum),
        gameDiff: diffGame,
        gameDiffHead: diffGameHead,
      });

      prevSave = winNum - loseNum;

      if (teamRank.length === num) {
        break;
      }
    }

    return teamRank;
  }

  /**
   * Add team data
   * @param addTeamForm Form data
   */
  async addTeam(addTeamForm: FormGroup) {
    const teamInfo = {
      teamName: addTeamForm.get('teamName').value,
      icon: addTeamForm.get('icon').value,
      typeAttack: addTeamForm.get('typeAttack').value,
      typeBunt: addTeamForm.get('typeBunt').value,
      typeSteal: addTeamForm.get('typeSteal').value,
      typeMind: addTeamForm.get('typeMind').value,
      ownerName: addTeamForm.get('owner').value,
      password: CryptoJS.SHA256(addTeamForm.get('password').value).toString(),
      players: addTeamForm.get('playerDataArray').value,
      farmPlayers: addTeamForm.get('farmPlayerDataArray').value,
      pitchers: addTeamForm.get('pitcherDataArray').value,
    };

    const url = this.backendApiConfig.baseurl + '/team';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    try {
      return await this.http.post(url, teamInfo, options).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  /**
   * Get team data
   * @param teamId Team ID
   */
  async getTeam(teamId: number) {
    const url = this.backendApiConfig.baseurl + '/team/' + teamId;

    try {
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  /**
   * Get all team data with user data
   */
  async getAllTeams() {
    const url = this.backendApiConfig.baseurl + '/teams';

    try {
      this.existTeams = await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }
}
