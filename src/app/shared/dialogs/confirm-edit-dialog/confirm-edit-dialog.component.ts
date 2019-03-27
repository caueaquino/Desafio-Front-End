import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-edit-dialog',
  templateUrl: './confirm-edit-dialog.component.html',
  styleUrls: ['./confirm-edit-dialog.component.css']
})
export class ConfirmEditDialogComponent implements OnInit {

  public res = false;

  constructor(private dialogRef: MatDialogRef<ConfirmEditDialogComponent>) { }

  ngOnInit() {
  }

  confirmEdit() {
    this.res = true;
    this.dialogRef.close();
  }

  cancelEdit() {
    this.dialogRef.close();
  }
}
