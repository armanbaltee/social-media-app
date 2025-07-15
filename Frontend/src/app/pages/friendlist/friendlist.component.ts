import { Component, OnInit } from '@angular/core';
import { PagesService } from '../service/pages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent implements OnInit {

  allUser: any[] =[]
  constructor(private pageService: PagesService, private snackBar: MatSnackBar){}


  ngOnInit(): void {
    this.getAllUserList();
  }

  getAllUserList(){
    this.pageService.getAllUserListApiCall().subscribe({
      next: (res:any)=>{
        console.log(res.users)
        this.allUser = res.users
        this.snackBar.open(`All user successfully fetch`, 'Close', {
          duration: 3000,
          panelClass:['success-snackbar']
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

}
