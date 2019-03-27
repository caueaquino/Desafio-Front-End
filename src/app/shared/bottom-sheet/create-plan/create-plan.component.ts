import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { PlanService } from '../../services/plan.service';

import { ConfirmCreatePlanDialogComponent } from '../../dialogs/confirm-create-plan-dialog/confirm-create-plan-dialog.component';
// tslint:disable-next-line:max-line-length
import { ErroConfirmCreatePlanDialogComponent } from '../../dialogs/erro-confirm-create-plan-dialog/erro-confirm-create-plan-dialog.component';
import { SucessCreatePlanDialogComponent } from '../../dialogs/sucess-create-plan-dialog/sucess-create-plan-dialog.component';
import { ConfirmEditDialogComponent } from '../../dialogs/confirm-edit-dialog/confirm-edit-dialog.component';
import { SucessEditDialogComponent } from '../../dialogs/sucess-edit-dialog/sucess-edit-dialog.component';

import { Plan } from '../../data/plan';
import { PlanType } from '../../data/planType';


@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {

  private people: any[];
  private plansType: PlanType[];
  private plans: Plan[];

  private formPlan = this.formBuilder.group({
    planName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    planType: [null, Validators.required],
    planResponsible: [null, [Validators.required]],
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
    id: [null, [Validators.required]]
  });

  constructor(private bottomSheetRef: MatBottomSheetRef<CreatePlanComponent>,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private planService: PlanService,
              private router: Router) {
  }

  ngOnInit() {
    this.people = this.planService.getPeople();
    this.plansType = this.planService.getPlansType();
    this.plans = this.planService.getPlans();
    this.setForm();
  }

  confirmButton() {
    if (this.router.isActive('Planos/EditarPlano', true)) {
      this.confirmButtonEitPlan();

    } else {
      this.confirmButtonCreatePlan();
    }
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

  confirmButtonEitPlan() {
    if (this.formPlan.valid) {
      const dialogConfirm = this.dialog.open(ConfirmEditDialogComponent);

      dialogConfirm.beforeClose().subscribe(() => {
        if (dialogConfirm.componentInstance.res) {
          this.planService.removePlan(this.formPlan.value);
          this.formPlan.patchValue(this.planService.setShowDate(this.formPlan.value));

          if (this.formPlan.value.childPlans === null) {
            this.planService.createPlan(this.formPlan.value);

          } else {
            console.log(this.formPlan.value);
            this.planService.createChildPlan(this.formPlan.value);
          }

          this.bottomSheetRef.dismiss();
          this.dialog.open(SucessEditDialogComponent);
        }
      });
    } else {
      this.dialog.open(ErroConfirmCreatePlanDialogComponent);
    }
  }

  setForm() {
    this.formPlan.patchValue(this.planService.getAuxPlan());
  }
}
