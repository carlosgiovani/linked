import { Component, EventEmitter, Inject, Output } from '@angular/core';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICards } from '../../../shared/services/search.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Output() userUpdated = new EventEmitter<ICards>();

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public user: ICards,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  updateUser() {
    // Update the user data here
    this.user.name = 'Updated Name';
    this.user.manaCost = 'updated@example.com';

    this.userUpdated.emit(this.user);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
