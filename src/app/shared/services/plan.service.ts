import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { PlanType } from './../data/planType';
import { Plan } from './../data/plan';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private indexId: any;

  private indexIdPlanType: any;

  public title: string;

  private user = {
    name: 'Usuário Qualiex',
    email: 'Usuário@qualiex.com'
  };

  private people = [
    {name: 'Usuário Qualiex', email: 'Usuário@qualiex.com'},
    {name: 'Maria', email: 'Maria@email.com'},
    {name: 'João', email: 'João@email.com'},
    {name: 'Marcos', email: 'Marcos@email.com'},
    {name: 'Julia', email: 'Julia@email.com'},
    {name: 'Roberto', email: 'Roberto@email.com'},
    {name: 'Camila', email: 'Camila@email.com'}
  ];

  private plans: Plan[];

  private myPlans: Plan[];

  private auxPlan: Plan;

  private plansType: PlanType[];

  private auxPlanType: PlanType;

  public menuEvent = new EventEmitter();

  constructor(private router: Router) {
    this.indexId = 0;

    this.indexIdPlanType = 0;

    this.setInicialTitle();

    this.plans = [];

    this.myPlans = [];

    this.plansType = [{planTypeName : 'Tipo padrão', id: 0}];
  }

  getUser() {
    return this.user;
  }

  getIndexId() {
    this.indexId++;
    return this.indexId;
  }

  getIndexIdPlanType() {
    this.indexIdPlanType++;
    return this.indexIdPlanType;
  }

  getPeople() {
    return this.people;
  }

  getPlans() {
    return this.plans;
  }

  getAllPlans() {

    if (this.router.isActive('Planos/MeusPlanos', true)) {
      return this.plans.filter(plan => {
         if (plan.planResponsible.email === this.user.email) {
           return plan;
         }
      });

    } else if (this.router.isActive('Planos/Iniciados', true)) {
      return this.plans.filter(plan => {
        if (plan.details.status === 'Aberto') {
          return plan;
        }
      });


    } else if (this.router.isActive('Planos/Concluidos', true)) {
      return this.plans.filter(plan => {
        if (plan.details.status === 'Concluído') {
          return plan;
        }
      });


    } else if (this.router.isActive('Planos/Suspensos', true)) {
      return this.plans.filter(plan => {
        if (plan.details.status === 'Aguardando início') {
          return plan;
        }
      });

    } else if (this.router.isActive('Planos/Cancelados', true)) {
      return this.plans.filter(plan => {
        if (plan.details.status === 'Cancelado') {
          return plan;
        }
      });
    }
    return this.plans;
  }

  getAuxPlan() {
    return this.auxPlan;
  }

  getPlansType() {
    return this.plansType;
  }

  getAuxPlanType() {
    return this.auxPlanType;
  }

  setAuxPlan(plan: Plan) {
    this.auxPlan = plan;
  }

  setAuxPlanType(planType: PlanType) {
    this.auxPlanType = planType;
  }

  addPlanType(planType: PlanType) {
    this.plansType.push(planType);
    console.log(this.plansType);
  }

  updatePlanType(planType: PlanType) {
    for (let i = 0; i < this.plansType.length; i++) {
      if (this.plansType[i].id === planType.id) {
        this.plansType[i] = planType;
      }
    }
  }

  removePlan(plan: Plan) {
    for (let i = 0; i < this.plans.length; i++) {
      if (this.plans[i].id === plan.id) {
        this.plans.splice(i, 1);
        return true;
      }
      for (let j = 0; i < this.plans[i].childPlans.length; j++) {
        if (this.plans[i].childPlans[j].id === plan.id) {
          this.plans[i].childPlans.splice(j, 1);
          return true;
        }
      }
    }
    return false;
  }

  removePlanType(planType: PlanType) {
    for (let i = 0; i < this.plansType.length; i++) {
      if (this.plansType[i].id === planType.id) {
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
  }

  createChildPlan(plan) {
    for (const p of this.plans) {
      if (plan.parent.id === p.id) {
        if (p.childPlans === null) {
          p.childPlans = [];
        }
        p.childPlans.push(plan);
        return true;
      }
    }
    return false;
  }

  updatePlan(plan: Plan) {
    for (let i = 0; i < this.plans.length; i++) {
      if (this.plans[i].id === plan.id) {
        this.plans[i] = plan;
        for (const childPlan of this.plans[i].childPlans) {
          childPlan.parent = plan;
        }
      } else {

      }
    }
  }

  setShowDate(plan: Plan) {
    if (plan.beginDate === null && plan.endDate === null) {
      plan.showDate = 'Sem prazo definido';

    } else if (plan.beginDate === null) {
      plan.showDate = `Finalizar até ${plan.endDate.getDate()}/${plan.endDate.getMonth() + 1}/${plan.endDate.getFullYear()}`;

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
