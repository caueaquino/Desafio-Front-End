import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../modules/angular-material.module';

import { ConfirmCreatePlanDialogComponent } from './confirm-create-plan-dialog/confirm-create-plan-dialog.component';
import { ErroConfirmCreatePlanDialogComponent } from './erro-confirm-create-plan-dialog/erro-confirm-create-plan-dialog.component';
import { SucessCreatePlanDialogComponent } from './sucess-create-plan-dialog/sucess-create-plan-dialog.component';
import { ConfirmCreateTypePlanDialogComponent } from './confirm-create-type-plan-dialog/confirm-create-type-plan-dialog.component';
import { SucessCreatePlanTypeDialogComponent } from './sucess-create-plan-type-dialog/sucess-create-plan-type-dialog.component';

@NgModule({
  declarations: [
    ConfirmCreatePlanDialogComponent,
    ErroConfirmCreatePlanDialogComponent,
    SucessCreatePlanDialogComponent,
    ConfirmCreateTypePlanDialogComponent,
    SucessCreatePlanTypeDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  entryComponents: [
    ConfirmCreatePlanDialogComponent,
    ErroConfirmCreatePlanDialogComponent,
    SucessCreatePlanDialogComponent,
    ConfirmCreateTypePlanDialogComponent,
    SucessCreatePlanTypeDialogComponent
  ]
})
export class DialogModule { }
