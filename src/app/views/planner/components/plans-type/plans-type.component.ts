import { Component, OnInit } from '@angular/core';

import { PlanService } from './../../../../shared/services/plan.service';

import { MatDialog } from '@angular/material';

import { ConfirmRemoveDialogComponent } from 'src/app/shared/dialogs/confirm-remove-dialog/confirm-remove-dialog.component';
import { SucessRemoveDialogComponent } from 'src/app/shared/dialogs/sucess-remove-dialog/sucess-remove-dialog.component';


@Component({
  selector: 'app-plans-type',
  templateUrl: './plans-type.component.html',
  styleUrls: ['./plans-type.component.css']
})
export class PlansTypeComponent implements OnInit {

  private typePlans: string[];

  constructor(private planService: PlanService,
              private dialog: MatDialog) {

    this.typePlans = this.planService.getPlansType();
  }

  ngOnInit() {
  }

  removePlanType(typePlan: string) {
    const removeDialog = this.dialog.open(ConfirmRemoveDialogComponent);

    removeDialog.beforeClose().subscribe(() => {
      if (removeDialog.componentInstance.res) {
        this.planService.removePlanType(typePlan);
        this.dialog.open(SucessRemoveDialogComponent);
      }
    })
  }
}
