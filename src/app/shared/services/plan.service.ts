import { Plan } from './../data/plan';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private people = ['Maria', 'João', 'Marcos', 'Julia', 'Roberto', 'Camila'];

  private plans: Plan[];

  private plansType: string[];

  constructor() {
    this.plans = [];

    this.plansType = ['Tipo padrão'];
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

  createPlan(plan: Plan) {
    this.plans.push(plan);
    console.log(this.plans);
  }
}
