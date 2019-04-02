import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-remove-dialog',
  templateUrl: './confirm-remove-dialog.component.html',
  styleUrls: ['../dialog.component.css']
})
export class ConfirmRemoveDialogComponent implements OnInit {

  public res = false;

  constructor(private dialogRef: MatDialogRef<ConfirmRemoveDialogComponent>) { }

  ngOnInit() {
  }

  confirmRemove() {
    this.res = true;
    this.dialogRef.close();
  }

  cancelRemove() {
    this.dialogRef.close();
  }

}
