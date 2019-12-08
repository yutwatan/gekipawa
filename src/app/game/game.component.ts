import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { CurrentService } from '../top/current.service';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  globalConfig = this.configService.get('global');
  playTeamId: number = Number(localStorage.getItem('teamId'));
  championTeamId: number;
  continueWin: number;
  inningResults: any[] = [];

  constructor(
    private configService: ConfigService,
    private currentService: CurrentService,
    private gameService: GameService,
  ) { }

  async ngOnInit() {
    const current: any = await this.currentService.getCurrent();
    this.championTeamId = current.team.id;
    this.continueWin = current.continueWin;

    await this.getInningResults();
  }

  async getInningResults() {
    this.inningResults = await this.gameService.getInningResults();
  }
}
