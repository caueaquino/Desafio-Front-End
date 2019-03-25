import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';

import { BottomSheetModule } from 'src/app/shared/bottom-sheet/bottom-sheet.module';

import { PlannerRouting } from './planner.routing';

import { PlannerComponent } from './planner.component';
import { GeralViewComponent } from './components/geral-view/geral-view.component';
import { PlansComponent } from './components/plans/plans.component';

import { ServicesModule } from 'src/app/shared/services/services.module';
import { DialogModule } from 'src/app/shared/dialogs/dialog.module';

@NgModule({
  declarations: [
    PlannerComponent,
    GeralViewComponent,
    PlansComponent
  ],
  imports: [
    CommonModule,
    PlannerRouting,
    AngularMaterialModule,
    BottomSheetModule,
    ServicesModule,
    DialogModule
  ]
})
export class PlannerModule { }
