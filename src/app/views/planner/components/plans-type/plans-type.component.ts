import { Component, OnInit } from '@angular/core';

import { PlanService } from './../../../../shared/services/plan.service';


@Component({
  selector: 'app-plans-type',
  templateUrl: './plans-type.component.html',
  styleUrls: ['./plans-type.component.css']
})
export class PlansTypeComponent implements OnInit {

  private typePlans: string[];

  constructor(private planService: PlanService) {
    this.typePlans = this.planService.getPlansType();
  }

  ngOnInit() {
  }

}
