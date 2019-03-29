import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog, MatBottomSheet, MatBottomSheetRef } from '@angular/material';

import { Plan } from 'src/app/shared/data/plan';

import { PlanService } from 'src/app/shared/services/plan.service';

import { ConfirmRemoveDialogComponent } from 'src/app/shared/dialogs/confirm-remove-dialog/confirm-remove-dialog.component';
import { SucessRemoveDialogComponent } from 'src/app/shared/dialogs/sucess-remove-dialog/sucess-remove-dialog.component';
import { CreatePlanComponent } from 'src/app/shared/bottom-sheet/create-plan/create-plan.component';
import { Location } from '@angular/common';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  private plansList: Plan[];

  private filterList: Plan[];

  constructor(private planService: PlanService,
              private dialog: MatDialog,
              private bottomSheet: MatBottomSheet,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private location: Location) {

    this.plansList = [];
  }

  ngOnInit() {
    this.setPlansList();

    this.activeRoute.url.subscribe(() => this.setPlansList());
  }

  drop(event: CdkDragDrop<Plan[]>) {
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

    bs.afterDismissed().subscribe(() => {
      this.setPlansList();
      this.location.back();
    });
  }

  updateStatusPlan(plan: Plan, status: string) {
    plan.details.status = status;
    plan = this.planService.setShowDate(plan);
    this.setPlansList();
  }

  removePlan(plan: Plan) {
    let aux;
    this.activeRoute.params.subscribe(res => { aux = res; });
    this.router.navigate(['/Planos', 'Carregando']).then(() => this.router.navigate(['Planos', aux]));
    const removeDialog = this.dialog.open(ConfirmRemoveDialogComponent);

    removeDialog.beforeClose().subscribe(() => {
      if (removeDialog.componentInstance.res) {
        this.planService.removePlan(plan);
        this.dialog.open(SucessRemoveDialogComponent);
      }
    });
  }

  setPlansList() {
    this.plansList = this.planService.getAllPlans();
  }
}
