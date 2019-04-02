import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erro-confirm-create-plan-dialog',
  templateUrl: './erro-confirm-create-plan-dialog.component.html',
  styleUrls: ['../dialog.component.css']
})
export class ErroConfirmCreatePlanDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ErroConfirmCreatePlanDialogComponent>) { }

  ngOnInit() {
  }

  okButton() {
    this.dialogRef.close();
  }
}
