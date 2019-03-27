import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Router } from '@angular/router';

import { MatDialog, MatBottomSheet } from '@angular/material';

import { Plan } from 'src/app/shared/data/plan';

import { PlanService } from 'src/app/shared/services/plan.service';

import { ConfirmRemoveDialogComponent } from 'src/app/shared/dialogs/confirm-remove-dialog/confirm-remove-dialog.component';
import { SucessRemoveDialogComponent } from 'src/app/shared/dialogs/sucess-remove-dialog/sucess-remove-dialog.component';
import { CreatePlanComponent } from 'src/app/shared/bottom-sheet/create-plan/create-plan.component';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  private user: any;

  private plansList: Plan[];

  constructor(private planService: PlanService,
              private dialog: MatDialog,
              private bottomSheet: MatBottomSheet,
              private router: Router) {

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

  updatePlan(plan: Plan) {
    this.planService.setAuxPlan(plan);

    const bs = this.bottomSheet.open(CreatePlanComponent);

    bs.afterDismissed().subscribe(() => this.router.navigate(['/Planos']));
  }

  updateStatusPlan(plan: Plan, status: string) {
    this.user = this.planService.getUser();
    plan.details.status = status;
    plan = this.planService.setShowDate(plan);
  }

  removePlan(plan: Plan) {
    const removeDialog = this.dialog.open(ConfirmRemoveDialogComponent);

    removeDialog.beforeClose().subscribe(() => {
      if (removeDialog.componentInstance.res) {
        this.planService.removePlan(plan);
        this.dialog.open(SucessRemoveDialogComponent);
      }
    });
  }
}
