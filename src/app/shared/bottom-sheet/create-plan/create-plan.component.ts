import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { PlanService } from '../../services/plan.service';

import { ConfirmCreatePlanDialogComponent } from '../../dialogs/confirm-create-plan-dialog/confirm-create-plan-dialog.component';
// tslint:disable-next-line:max-line-length
import { ErroConfirmCreatePlanDialogComponent } from '../../dialogs/erro-confirm-create-plan-dialog/erro-confirm-create-plan-dialog.component';
import { SucessCreatePlanDialogComponent } from '../../dialogs/sucess-create-plan-dialog/sucess-create-plan-dialog.component';
import { Plan } from '../../data/plan';


@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {

  private people: string[];
  private plansType: string[];
  private plans: Plan[];

  private formPlan = this.formBuilder.group({
    planName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    planType: [null, Validators.required],
    planResponsible: [null, [Validators.required, Validators.minLength(3)]],
    beginDate: [null, [Validators.nullValidator]],
    endDate: [null, [Validators.nullValidator]],
    showDate: ['Sem prazo definido', Validators.nullValidator],
    details: this.formBuilder.group({
      description: [null, [Validators.minLength(3), Validators.maxLength(1000)]],
      interested: [null, Validators.nullValidator],
      cost: [null, Validators.nullValidator],
      status: ['Aguardando início', Validators.nullValidator]
    }),
    childPlans: [null, [Validators.nullValidator]],
    id: [this.planService.getIndexId(), [Validators.required]]
  });

  constructor(private bottomSheetRef: MatBottomSheetRef<CreatePlanComponent>,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private planService: PlanService) {
  }

  ngOnInit() {
    this.people = this.planService.getPeople();
    this.plansType = this.planService.getPlansType();
    this.plans = this.planService.getPlans();
  }

  confirmButtonCreatePlan() {
    if (this.formPlan.valid) {
      const dialogConfirm = this.dialog.open(ConfirmCreatePlanDialogComponent);

      dialogConfirm.beforeClose().subscribe(res => {
        if (dialogConfirm.componentInstance.res) {
          this.formPlan.patchValue(this.planService.setShowDate(this.formPlan.value));

          if (this.formPlan.value.childPlans === null) {
            this.planService.createPlan(this.formPlan.value);

          } else {
            console.log(this.formPlan.value);
            this.planService.createChildPlan(this.formPlan.value);
          }

          this.bottomSheetRef.dismiss();
          this.dialog.open(SucessCreatePlanDialogComponent);
        }
      });

    } else {
      this.dialog.open(ErroConfirmCreatePlanDialogComponent);
    }
  }
}
