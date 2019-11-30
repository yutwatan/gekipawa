import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../current.service';
import { Champion } from './champion';

@Component({
  selector: 'app-now-champion',
  templateUrl: './now-champion.component.html',
  styleUrls: ['./now-champion.component.css']
})
export class NowChampionComponent implements OnInit {
  champion: Champion;

  constructor(private currentService: CurrentService) { }

  async ngOnInit() {
    this.champion = await this.currentService.getChampionInfo();
  }

}
