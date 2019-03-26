import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sucess-create-plan-type-dialog',
  templateUrl: './sucess-create-plan-type-dialog.component.html',
  styleUrls: ['./sucess-create-plan-type-dialog.component.css']
})
export class SucessCreatePlanTypeDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SucessCreatePlanTypeDialogComponent>) { }

  ngOnInit() {
  }

  okButton() {
    this.dialogRef.close();
  }
}
