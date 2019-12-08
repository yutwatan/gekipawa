import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  inningResults: any[] = [];
  gameResult: any;
  winTeam: string;
  topResult: string;
  bottomResult: string;

  constructor(private gameService: GameService) { }

  async ngOnInit() {
    this.inningResults = await this.gameService.getInningResults();
    this.gameResult = await this.gameService.getGameResult();
    this.decideWinTeam();
  }

  decideWinTeam() {
    const topScore = this.gameResult.topTeam.score;
    const bottomScore = this.gameResult.bottomTeam.score;
    const topTeamName = this.gameResult.topTeam.team.name;
    const bottomTeamName = this.gameResult.bottomTeam.team.name;

    this.winTeam = topScore > bottomScore ? topTeamName : bottomTeamName;
    this.topResult = topScore > bottomScore ? '勝' : '負';
    this.bottomResult = bottomScore > topScore ? '勝' : '負';
  }
}
