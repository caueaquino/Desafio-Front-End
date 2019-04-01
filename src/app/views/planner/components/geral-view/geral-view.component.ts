import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlanService } from 'src/app/shared/services/plan.service';



@Component({
  selector: 'app-geral-view',
  templateUrl: './geral-view.component.html',
  styleUrls: ['./geral-view.component.css']
})
export class GeralViewComponent implements OnInit {

  private items = [
    {name: 'Todos', qtd: 0, icon: 'data_usage', class: 'todos-card'},
    {name: 'Meus planos', qtd: 0, icon: 'account_circle_outlined', class: 'meus-planos-card'},
    {name: 'Iniciados', qtd: 0, icon: 'play_circle_outline', class: 'iniciados-card'},
    {name: 'Concluídos', qtd: 0, icon: 'check_circle_outline', class: 'concluidos-card'},
    {name: 'Suspensos', qtd: 0, icon: 'query_builder', class: 'suspensos-card'},
    {name: 'Cancelados', qtd: 0, icon: 'not_interested', class: 'cancelados-card'}
  ];

  constructor(private planService: PlanService,
              private router: Router) { }

  ngOnInit() {
    this.setItems();
  }

  goItem(optItem: string) {
    this.planService.setTitle(2);

    switch (optItem) {
      case 'Todos': {
        this.router.navigate(['/Planos', 'Todos']);
        break;
      }

      case 'Meus planos': {
        this.router.navigate(['/Planos', 'MeusPlanos']);
        break;
      }

      case 'Iniciados': {
        this.router.navigate(['/Planos', 'Iniciados']);
        break;
      }

      case 'Concluídos': {
        this.router.navigate(['/Planos', 'Concluidos']);
        break;
      }

      case 'Suspensos': {
        this.router.navigate(['/Planos', 'Suspensos']);
        break;
      }

      case 'Cancelados': {
        this.router.navigate(['/Planos', 'Cancelados']);
        break;
      }
    }
  }

  setItems() {
    const plans = this.planService.getPlans();

    this.items[0].qtd = plans.length;

    for (const plan of plans) {
      if (plan.planResponsible.email === this.planService.getUser().email) {
        this.items[1].qtd++;
      }

      if (plan.details.status === 'Aberto') {
        this.items[2].qtd++;

      } else if (plan.details.status === 'Concluído') {
        this.items[3].qtd++;

      } else if (plan.details.status === 'Aguardando início') {
        this.items[4].qtd++;

      } else if (plan.details.status === 'Cancelado') {
        this.items[5].qtd++;
      }
    }
 }
}
