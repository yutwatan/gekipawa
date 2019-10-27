import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../current.service';

@Component({
  selector: 'app-gekipawa-info',
  templateUrl: './gekipawa-info.component.html',
  styleUrls: ['./gekipawa-info.component.css']
})
export class GekipawaInfoComponent implements OnInit {
  times = this.currentService.getTimes();
  termDay = this.currentService.getTermDay();

  constructor(private currentService: CurrentService) { }

  ngOnInit() {
  }

}
