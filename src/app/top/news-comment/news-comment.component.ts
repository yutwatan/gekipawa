import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-news-comment',
  templateUrl: './news-comment.component.html',
  styleUrls: ['./news-comment.component.css']
})
export class NewsCommentComponent implements OnInit {
  newsComments = this.historyService.getNewsAndComments(10);

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
  }

}
