import { Component, OnInit } from '@angular/core';

import { MatDialogRef, MatBottomSheetRef } from '@angular/material';


@Component({
  selector: 'app-confirm-create-plan-dialog',
  templateUrl: './confirm-create-plan-dialog.component.html',
  styleUrls: ['./confirm-create-plan-dialog.component.css']
})
export class ConfirmCreatePlanDialogComponent implements OnInit {

  public res = false;

  constructor(private dialogRef: MatDialogRef<ConfirmCreatePlanDialogComponent>) { }

  ngOnInit() {
  }

  confirmPlanCreation() {
    this.res = true;
    this.dialogRef.close();
  }

  cancelPlanCreation() {
    this.dialogRef.close();
  }
}
