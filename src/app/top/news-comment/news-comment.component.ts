import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { News } from '../news';

@Component({
  selector: 'app-news-comment',
  templateUrl: './news-comment.component.html',
  styleUrls: ['./news-comment.component.css']
})
export class NewsCommentComponent implements OnInit {
  newsComments: News[];

  constructor(private historyService: HistoryService) { }

  async ngOnInit() {
    this.newsComments = await this.historyService.getNewsAndComments(10);
  }

}
