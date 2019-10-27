import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../current.service';

@Component({
  selector: 'app-now-champion',
  templateUrl: './now-champion.component.html',
  styleUrls: ['./now-champion.component.css']
})
export class NowChampionComponent implements OnInit {
  champion = this.currentService.getChampionInfo();

  constructor(private currentService: CurrentService) { }

  ngOnInit() {
  }

}
