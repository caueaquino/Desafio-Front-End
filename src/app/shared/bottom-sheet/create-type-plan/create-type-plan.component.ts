import { Component, OnInit } from '@angular/core';

import { MatBottomSheetRef, MatDialog } from '@angular/material';

import { FormBuilder, Validators } from '@angular/forms';

import { PlanService } from '../../services/plan.service';
import { Router } from '@angular/router';

// tslint:disable-next-line:max-line-length
import { ConfirmCreateTypePlanDialogComponent } from '../../dialogs/confirm-create-type-plan-dialog/confirm-create-type-plan-dialog.component';
// tslint:disable-next-line:max-line-length
import { ErroConfirmCreatePlanDialogComponent } from '../../dialogs/erro-confirm-create-plan-dialog/erro-confirm-create-plan-dialog.component';
import { SucessCreatePlanTypeDialogComponent } from '../../dialogs/sucess-create-plan-type-dialog/sucess-create-plan-type-dialog.component';
import { ConfirmEditDialogComponent } from '../../dialogs/confirm-edit-dialog/confirm-edit-dialog.component';
import { SucessEditDialogComponent } from '../../dialogs/sucess-edit-dialog/sucess-edit-dialog.component';

@Component({
  selector: 'app-create-type-plan',
  templateUrl: './create-type-plan.component.html',
  styleUrls: ['./create-type-plan.component.css']
})
export class CreateTypePlanComponent implements OnInit {

  private formPlanType = this.formBuilder.group({
    planTypeName: [null, [Validators.required, Validators.minLength(3)]],
    id: [null, [Validators.required]]
  });

  constructor(private bottomSheetRef: MatBottomSheetRef<CreateTypePlanComponent>,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private planService: PlanService,
              private router: Router) { }

  ngOnInit() {
    this.setFormValue();
  }

  confirmButtonCreatePlanType() {
    if (this.formPlanType.valid) {
      const dialogConfirm = this.dialog.open(ConfirmCreateTypePlanDialogComponent);

      dialogConfirm.beforeClose().subscribe(() => {
        if (dialogConfirm.componentInstance.res) {
          this.planService.addPlanType(this.formPlanType.value);
          this.bottomSheetRef.dismiss();
          this.dialog.open(SucessCreatePlanTypeDialogComponent);
        }
      });
    } else {
      this.dialog.open(ErroConfirmCreatePlanDialogComponent);
    }
  }

  confirmButtonEditPlanType() {
    if (this.formPlanType.valid) {
      const dialogConfirm = this.dialog.open(ConfirmEditDialogComponent);

      dialogConfirm.beforeClose().subscribe(() => {
        if (dialogConfirm.componentInstance.res) {
          console.log(this.formPlanType.value);
          this.planService.updatePlanType(this.formPlanType.value);
          this.bottomSheetRef.dismiss();
          this.dialog.open(SucessEditDialogComponent);
        }
      });
    } else {
      this.dialog.open(ErroConfirmCreatePlanDialogComponent);
    }
  }

  setFormValue() {
    this.formPlanType.patchValue(this.planService.getAuxPlanType());
  }
}
