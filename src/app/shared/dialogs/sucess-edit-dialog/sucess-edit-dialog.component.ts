import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sucess-edit-dialog',
  templateUrl: './sucess-edit-dialog.component.html',
  styleUrls: ['./sucess-edit-dialog.component.css']
})
export class SucessEditDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SucessEditDialogComponent>) { }

  ngOnInit() {
  }

  okButton() {
    this.dialogRef.close();
  }
}
