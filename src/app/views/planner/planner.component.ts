import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatBottomSheet } from '@angular/material';

import { CreatePlanComponent } from 'src/app/shared/bottom-sheet/create-plan/create-plan.component';
import { CreateTypePlanComponent } from 'src/app/shared/bottom-sheet/create-type-plan/create-type-plan.component';

import { PlanService } from 'src/app/shared/services/plan.service';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  constructor(private router: Router,
              private bottomSheet: MatBottomSheet,
              private planService: PlanService) { }

  ngOnInit() {
  }

  openCreatePlanBottomSheet() {
    const bs = this.bottomSheet.open(CreatePlanComponent);

    bs.afterDismissed().subscribe(() => this.router.navigate(['/Planos']));
  }

  goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  openCreateTypePlanBottomSheet() {
    const bs = this.bottomSheet.open(CreateTypePlanComponent);

    bs.afterDismissed().subscribe(() => this.router.navigate(['/TiposDePlano']));
  }
}
