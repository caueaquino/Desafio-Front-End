import { PlansTypeComponent } from './components/plans-type/plans-type.component';
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
        { path: 'Planos', component: PlansComponent,
          children: [
            { path: '', component: PlansComponent },
            { path: 'CriarPlano', component: PlansComponent },
            { paht: 'EditarPlano', component: PlansComponent }
          ]
        },
        { path: 'TiposDePlano', component: PlansTypeComponent,
          children: [
            { path: '', component: PlansTypeComponent },
            { path: 'CriarPlano', component: PlansTypeComponent },
            { path: 'EditarPlano', component: PlansTypeComponent }
          ]
        }
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
