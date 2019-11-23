import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../current.service';

@Component({
  selector: 'app-now-champion',
  templateUrl: './now-champion.component.html',
  styleUrls: ['./now-champion.component.css']
})
export class NowChampionComponent implements OnInit {
  champion: any;

  constructor(private currentService: CurrentService) { }

  async ngOnInit() {
    this.champion = await this.currentService.getChampionInfo();
  }

}
