import { Component, EventEmitter } from '@angular/core';
import { PlanService } from './shared/services/plan.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Planner-v3';

  constructor(private planService: PlanService) {
  }

  setEventSideBar() {
    this.planService.menuEvent.emit();
  }

}
