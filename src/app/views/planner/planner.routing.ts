import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlannerComponent } from './planner.component';
import { GeralViewComponent } from './components/geral-view/geral-view.component';
import { PlansComponent } from './components/plans/plans.component';

const plannerRoutes = [{
    path: '', component: PlannerComponent,
    children: [
        { path : '', redirectTo: 'VisaoGeral'},
        { path: 'VisaoGeral', component: GeralViewComponent },
        { path: 'Planos', component: PlansComponent}
    ]
}];

@NgModule({
    imports: [
      RouterModule.forChild(plannerRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class PlannerRouting { }