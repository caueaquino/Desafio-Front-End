import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';

import { PlannerRouting } from './planner.routing';

import { PlannerComponent } from './planner.component';
import { GeralViewComponent } from './components/geral-view/geral-view.component';
import { PlansComponent } from './components/plans/plans.component';

@NgModule({
  declarations: [
    PlannerComponent,
    GeralViewComponent,
    PlansComponent
  ],
  imports: [
    CommonModule,
    PlannerRouting,
    AngularMaterialModule
  ]
})
export class PlannerModule { }
