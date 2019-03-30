import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRouting } from './app.routing';

import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { PlanService } from './shared/services/plan.service';
import { ServicesModule } from './shared/services/services.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    AngularMaterialModule,
    ServicesModule
  ],
  providers: [PlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
