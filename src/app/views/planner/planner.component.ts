import { PlanType } from './../../shared/data/planType';
import { Observable } from 'rxjs';
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatBottomSheet, MatDrawer } from '@angular/material';

import { CreatePlanComponent } from 'src/app/shared/bottom-sheet/create-plan/create-plan.component';
import { CreateTypePlanComponent } from 'src/app/shared/bottom-sheet/create-type-plan/create-type-plan.component';

import { PlanService } from 'src/app/shared/services/plan.service';
import { Location } from '@angular/common';
import { componentHostSyntheticProperty } from '@angular/core/src/render3';


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  private showButtonGoTop = false;

  private menuButtonShow = true;

  constructor(private router: Router,
              private bottomSheet: MatBottomSheet,
              private planService: PlanService,
              private location: Location,
              private activeRoute: ActivatedRoute,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.planService.menuEvent.subscribe(() => console.log('event 2'));

    this.planService.menuEvent.subscribe(() => {
      console.log('aaaaa');
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.documentElement.scrollTop === 0) {
      setTimeout(() => {
        this.showButtonGoTop = false;
        this.menuButtonShow = true;
      },
      100);

    } else {
      this.showButtonGoTop = true;
      this.menuButtonShow = false;
    }
  }

  showSideMenu(drawer) {
    drawer.toggle();
    console.log(drawer);
  }

  openCreatePlanBottomSheet() {
    const plan = {
      planName: null,
      planType: null,
      planResponsible: null,
      beginDate: null,
      endDate: null,
      showDate: null,
      details: {
          description: null,
          interested: null,
          cost: null,
          status: 'Aguardando início',
      },
      childPlans: [],
      id: this.planService.getIndexId(),
      parent: null
    };

    this.planService.setAuxPlan(plan);

    const bs = this.bottomSheet.open(CreatePlanComponent);

    this.activeRoute.params.subscribe(params =>  console.log(params));

    bs.afterDismissed().subscribe(() => this.location.back());
  }

  goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.showButtonGoTop = false;
    },
    100);
  }

  openCreateTypePlanBottomSheet() {
    const planType = {
      planTypeName: '',
      id: this.planService.getIndexIdPlanType()
    };

    this.planService.setAuxPlanType(planType);

    const bs = this.bottomSheet.open(CreateTypePlanComponent);

    bs.afterDismissed().subscribe(() => this.router.navigate(['/TiposDePlano']));
  }
}
