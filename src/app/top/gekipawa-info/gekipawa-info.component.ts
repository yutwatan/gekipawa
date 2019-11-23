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
  termDay = this.currentService.getTermDay();
  times: number;

  constructor(
    private configService: ConfigService,
    private currentService: CurrentService
  ) { }

  async ngOnInit() {
    this.times = await this.currentService.getTimes();
  }

}
