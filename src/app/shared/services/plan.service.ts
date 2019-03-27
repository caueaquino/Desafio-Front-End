import { Plan } from './../data/plan';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private indexId: any;

  title: string;

  private user = {
    name: 'Usuário Qualiex',
    email: 'usuário@qualiex.com'
  };

  private people = ['Maria', 'João', 'Marcos', 'Julia', 'Roberto', 'Camila'];

  private plans: Plan[];

  private plansType: string[];

  constructor(private router: Router) {
    this.indexId = 0;

    this.setInicialTitle();

    this.plans = [];

    this.plansType = ['Tipo padrão'];
  }

  getUser() {
    return this.user;
  }

  getIndexId() {
    this.indexId++;
    return this.indexId;
  }

  getPeople() {
    return this.people;
  }

  getPlans() {
    return this.plans;
  }

  getPlansType() {
    return this.plansType;
  }

  addPlanType(planType: string) {
    this.plansType.push(planType);
    console.log(this.plansType);
  }

  updatePlanType(planType: string, newType: string) {
    for (let i = 0; i < this.plansType.length; i++) {
      if (this.plansType[i] === planType) {
        this.plansType[i] = newType;
      }
    }
  }

  removePlan(plan: Plan) {
    for (let i = 0; i<this.plans.length; i++) {
      if (this.plans[i].id === plan.id) {
        this.plans.splice(i, 1);
        return true;
      }
      for(let j=0; i<this.plans[i].childPlans.length; j++){
        if (this.plans[i].childPlans[j].id === plan.id) {
          this.plans[i].childPlans.splice(j, 1);
          return true;
        }
      }
    }
    return false;
  }

  removePlanType(planType: string) {
    for (let i = 0; i < this.plansType.length; i++) {
      if (this.plansType[i] === planType) {
        this.plansType.splice(i, 1);
      }
    }
  }

  setInicialTitle() {
    if (this.router.isActive('VisaoGeral', true)) {
      this.title = 'Visão Geral';

    } else if (this.router.isActive('Planos', true)) {
      this.title = 'Planos';

    } else {
      this.title = 'Tipo De Plano';
    }
  }

  setTitle(option) {
    if (option === 1) {
      this.title = 'Visão Geral';
      this.router.navigate(['/VisaoGeral']);

    } else if (option === 2) {
      this.title = 'Planos';
      this.router.navigate(['/Planos']);

    } else {
      this.title = 'Tipo De Plano';
      this.router.navigate(['/TiposDePlano']);
    }
  }

  createPlan(plan: Plan) {
    this.plans.push(plan);
    console.log(this.plans);
  }

  createChildPlan(plan) {
    console.log(plan);
    console.log(plan.childPlans);
    console.log(plan.childPlans.id);
    for (const p of this.plans) {
      if (plan.childPlans.id === p.id) {
        plan.childPlans = null;
        if (p.childPlans === null) {
          p.childPlans = [];
        }
        p.childPlans.push(plan);
      }
    }
    console.log(this.plans);
  }

  setShowDate(plan: Plan) {
    if (plan.beginDate === null && plan.endDate === null) {
      plan.showDate = 'Sem prazo definido';

    } else if (plan.endDate === null) {
      plan.showDate = `Iniciar até ${plan.beginDate.getDate()}/${plan.beginDate.getMonth() + 1}/${plan.beginDate.getFullYear()}`;

    } else if (plan.details.status === 'Aberto' || plan.beginDate === null) {
      plan.showDate = `Concluir até ${plan.endDate.getDate()}/${plan.endDate.getMonth() + 1}/${plan.endDate.getFullYear()}`;

    } else if (plan.details.status === 'Aguardando início') {
      plan.showDate = `Iniciar até ${plan.beginDate.getDate()}/${plan.beginDate.getMonth() + 1}/${plan.beginDate.getFullYear()}`;

    } else if (plan.details.status === 'Concluído' || plan.details.status === 'Cancelado' || plan.details.status === null) {
      // tslint:disable-next-line:max-line-length
      plan.showDate = `De ${plan.beginDate.getDate()}/${plan.beginDate.getMonth() + 1}/${plan.beginDate.getFullYear()} até ${plan.endDate.getDate()}/${plan.endDate.getMonth() + 1}/${plan.endDate.getFullYear()}`;
    }
    return plan;
  }
}
