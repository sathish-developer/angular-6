import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  // OnClick Login
  loginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      panelClass: 'loginClass'
    });
  }
}

@Component({
  selector: 'login.component',
  templateUrl: 'login.component.html',
})
export class LoginComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
