import { Component, OnInit } from '@angular/core';
import { PagesService } from '../service/pages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-friendrequest',
  templateUrl: './friendrequest.component.html',
  styleUrls: ['./friendrequest.component.scss']
})
export class FriendrequestComponent implements OnInit {

  public allUser: any[] = [];

  constructor (private pageService: PagesService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getAllRequest();
  }

  getAllRequest(){
    this.pageService.friendRequestApiCall().subscribe({
      next: (res:any)=>{
        this.allUser = res.list;
        console.log(this.allUser)
        this.snackBar.open('Suceesfully get all request', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        })
      },
      error: (err)=>{
        this.snackBar.open(`Error: ${err.message}`, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
      }
    })
  }
  accept(){}
  reject(){}

}
