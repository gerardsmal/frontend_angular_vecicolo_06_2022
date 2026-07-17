import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-scelta-update',
  imports: [MatButtonModule, MatIconModule, MatButtonToggleModule, MatDialogModule, FormsModule],
  templateUrl: './scelta-update.html',
  styleUrl: './scelta-update.css',
})
export class SceltaUpdate {
  updateType:any;

  readonly dialog = inject(MatDialog);

  constructor(
    private dialogRef: MatDialogRef<SceltaUpdate>
  ) { }

  onUpdateTypeChange(){
    this.dialogRef.close(this.updateType);
  }
}
