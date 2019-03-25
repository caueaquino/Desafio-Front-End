import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../modules/angular-material.module';

import { CreatePlanComponent } from './create-plan/create-plan.component';

@NgModule({
  declarations: [
    CreatePlanComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  entryComponents: [
    CreatePlanComponent
  ]
})
export class BottomSheetModule { }
