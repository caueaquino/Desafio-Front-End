import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatBottomSheet } from '@angular/material';

import { CreatePlanComponent } from 'src/app/shared/bottom-sheet/create-plan/create-plan.component';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  constructor(private router: Router,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  openCreatePlanBottomSheet() {
    this.bottomSheet.open(CreatePlanComponent);
  }
}
