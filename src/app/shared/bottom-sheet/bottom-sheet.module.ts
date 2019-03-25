import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../modules/angular-material.module';

import { CreatePlanComponent } from './create-plan/create-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '../dialogs/dialog.module';

@NgModule({
  declarations: [
    CreatePlanComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule
  ],
  entryComponents: [
    CreatePlanComponent
  ]
})
export class BottomSheetModule { }
