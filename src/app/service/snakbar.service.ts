import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnakbarService {

  constructor(
    private snaknar : MatSnackBar
  ) { }

  OpenSnakbar(msg : string){
    this.snaknar.open(msg, 'close', {
      horizontalPosition : 'right',
      verticalPosition : 'top',
      duration : 3000
    })
  }
}
