import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  globalConfig = this.configService.get('global');

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }

}
