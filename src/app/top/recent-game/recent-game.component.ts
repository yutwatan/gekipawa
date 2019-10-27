import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-recent-game',
  templateUrl: './recent-game.component.html',
  styleUrls: ['./recent-game.component.css']
})
export class RecentGameComponent implements OnInit {
  recentlyGames = this.historyService.getRecentlyGames(5);

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
  }

}
