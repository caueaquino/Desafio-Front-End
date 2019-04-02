import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucess-create-plan-dialog',
  templateUrl: './sucess-create-plan-dialog.component.html',
  styleUrls: ['../dialog.component.css']
})
export class SucessCreatePlanDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SucessCreatePlanDialogComponent>) { }

  ngOnInit() {
  }

  okButton() {
    this.dialogRef.close();
  }
}
