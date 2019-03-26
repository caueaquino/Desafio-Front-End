import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-create-type-plan-dialog',
  templateUrl: './confirm-create-type-plan-dialog.component.html',
  styleUrls: ['./confirm-create-type-plan-dialog.component.css']
})
export class ConfirmCreateTypePlanDialogComponent implements OnInit {

  public res = false;

  constructor(private dialogRef: MatDialogRef<ConfirmCreateTypePlanDialogComponent>) { }

  ngOnInit() {
  }

  confirmPlanTypeCreation() {
    this.res = true;
    this.dialogRef.close();
  }

  cancelPlanTypeCreation() {
    this.dialogRef.close();
  }
}
