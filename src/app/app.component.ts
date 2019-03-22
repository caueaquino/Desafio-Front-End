import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Planner-v3';

  optionButton = new EventEmitter();

  constructor() {
  }

  menuButton() {
    this.optionButton.emit();
  }
}
