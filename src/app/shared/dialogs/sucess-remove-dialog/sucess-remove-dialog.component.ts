import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sucess-remove-dialog',
  templateUrl: './sucess-remove-dialog.component.html',
  styleUrls: ['./sucess-remove-dialog.component.css']
})
export class SucessRemoveDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SucessRemoveDialogComponent>) { }

  ngOnInit() {
  }

  okButton() {
    this.dialogRef.close();
  }
}
