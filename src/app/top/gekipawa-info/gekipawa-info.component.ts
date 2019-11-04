import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { CurrentService } from '../current.service';

@Component({
  selector: 'app-gekipawa-info',
  templateUrl: './gekipawa-info.component.html',
  styleUrls: ['./gekipawa-info.component.css']
})
export class GekipawaInfoComponent implements OnInit {
  globalConfig = this.configService.get('global');
  times = this.currentService.getTimes();
  termDay = this.currentService.getTermDay();

  constructor(
    private configService: ConfigService,
    private currentService: CurrentService
  ) { }

  ngOnInit() {
  }

}
