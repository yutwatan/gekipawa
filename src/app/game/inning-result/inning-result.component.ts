import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-inning-result',
  templateUrl: './inning-result.component.html',
  styleUrls: ['./inning-result.component.css']
})
export class InningResultComponent implements OnInit, OnChanges {
  @Input() topBottom: string;
  @Input() inningResult: any;
  @Input() inning: number;

  inningData: any;

  constructor() { }

  ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.inningResult) {
      this.inningResult = changes.inningResult.currentValue;
      this.inningData = this.inningResult[this.topBottom];
    }
  }
}
