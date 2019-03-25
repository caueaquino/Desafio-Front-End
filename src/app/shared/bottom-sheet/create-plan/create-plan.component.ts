import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<CreatePlanComponent>) { }

  ngOnInit() {
    
  }  
}
