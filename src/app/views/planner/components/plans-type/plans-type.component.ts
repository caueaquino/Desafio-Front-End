import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { PlanService } from './../../../../shared/services/plan.service';

import { MatDialog, MatBottomSheet } from '@angular/material';

import { ConfirmRemoveDialogComponent } from 'src/app/shared/dialogs/confirm-remove-dialog/confirm-remove-dialog.component';
import { SucessRemoveDialogComponent } from 'src/app/shared/dialogs/sucess-remove-dialog/sucess-remove-dialog.component';
import { CreateTypePlanComponent } from 'src/app/shared/bottom-sheet/create-type-plan/create-type-plan.component';

import { PlanType } from 'src/app/shared/data/planType';


@Component({
  selector: 'app-plans-type',
  templateUrl: './plans-type.component.html',
  styleUrls: ['./plans-type.component.css']
})
export class PlansTypeComponent implements OnInit {

  private typePlans: PlanType[];

  constructor(private planService: PlanService,
              private dialog: MatDialog,
              private bottomSheet: MatBottomSheet,
              private router: Router) {

    this.typePlans = this.planService.getPlansType();
  }

  ngOnInit() {
  }

  updatePlanType(typePlan: PlanType) {
    this.planService.setAuxPlanType(typePlan);

    const updateBottomSheet = this.bottomSheet.open(CreateTypePlanComponent);

    updateBottomSheet.afterDismissed().subscribe(() => this.router.navigate(['/TiposDePlano']));
  }

  removePlanType(typePlan: PlanType) {
    const removeDialog = this.dialog.open(ConfirmRemoveDialogComponent);

    removeDialog.beforeClose().subscribe(() => {
      if (removeDialog.componentInstance.res) {
        this.planService.removePlanType(typePlan);
        this.dialog.open(SucessRemoveDialogComponent);
      }
    });
  }
}
