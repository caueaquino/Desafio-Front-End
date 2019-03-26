import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Plan } from 'src/app/shared/data/plan';

import { PlanService } from 'src/app/shared/services/plan.service';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  private user: any;

  private plansList: Plan[];

  constructor(private planService: PlanService) {
    this.user = this.planService.getUser();
    this.plansList = this.planService.getPlans();
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    console.log(this.plansList);
  }

  updateStatusPlan(plan: Plan, status: string) {
    this.user = this.planService.getUser();
    plan.details.status = status;
    plan = this.planService.setShowDate(plan);
  }
}
