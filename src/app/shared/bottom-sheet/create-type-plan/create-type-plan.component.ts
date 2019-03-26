import { Component, OnInit } from '@angular/core';

import { MatBottomSheetRef, MatDialog } from '@angular/material';

import { FormBuilder, Validators } from '@angular/forms';

// tslint:disable-next-line:max-line-length
import { ConfirmCreateTypePlanDialogComponent } from '../../dialogs/confirm-create-type-plan-dialog/confirm-create-type-plan-dialog.component';
// tslint:disable-next-line:max-line-length
import { ErroConfirmCreatePlanDialogComponent } from '../../dialogs/erro-confirm-create-plan-dialog/erro-confirm-create-plan-dialog.component';
import { SucessCreatePlanTypeDialogComponent } from '../../dialogs/sucess-create-plan-type-dialog/sucess-create-plan-type-dialog.component';

import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-create-type-plan',
  templateUrl: './create-type-plan.component.html',
  styleUrls: ['./create-type-plan.component.css']
})
export class CreateTypePlanComponent implements OnInit {

  private formPlanType = this.formBuilder.group({
    planTypeName: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(private bottomSheetRef: MatBottomSheetRef<CreateTypePlanComponent>,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private planService: PlanService) { }

  ngOnInit() {
  }

  confirmButtonCreatePlanType() {
    if (this.formPlanType.valid) {
      const dialogConfirm = this.dialog.open(ConfirmCreateTypePlanDialogComponent);

      dialogConfirm.beforeClose().subscribe(res => {
        if (dialogConfirm.componentInstance.res) {
          this.planService.addPlanType(this.formPlanType.value.planTypeName);
          this.bottomSheetRef.dismiss();
          this.dialog.open(SucessCreatePlanTypeDialogComponent);
        }
      });
    } else {
      this.dialog.open(ErroConfirmCreatePlanDialogComponent);
    }
  }

}
