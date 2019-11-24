import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../current.service';
import { HistoryService } from '../history.service';
import { History } from '../history';

@Component({
  selector: 'app-recent-game',
  templateUrl: './recent-game.component.html',
  styleUrls: ['./recent-game.component.css']
})
export class RecentGameComponent implements OnInit {
  times: number;
  recentlyGames: History[];

  constructor(
    private currentService: CurrentService,
    private historyService: HistoryService
  ) { }

  async ngOnInit() {
    this.times = await this.currentService.getTimes();
    this.recentlyGames = await this.historyService.getRecentlyGames(5, this.times);
  }

}
