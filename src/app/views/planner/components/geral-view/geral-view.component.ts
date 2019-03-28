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
    {name: 'Todos', qtd: 0},
    {name: 'Meus planos', qtd: 0},
    {name: 'Iniciados', qtd: 0},
    {name: 'Concluídos', qtd: 0},
    {name: 'Suspensos', qtd: 0},
    {name: 'Cancelados', qtd: 0}
  ];

  constructor(private planService: PlanService,
              private router: Router) { }

  ngOnInit() {
    this.setItems();
  }

  goItem(optItem: string) {
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
    this.items[1].qtd = plans.length;

    for (const plan of plans) {
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
