import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-selector',
  templateUrl: './icon-selector.component.html',
  styleUrls: ['./icon-selector.component.css']
})
export class IconSelectorComponent implements OnInit {
  @Output() icon = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit() {
  }

  setIcon(e) {
    this.icon.emit(e);
  }
}
