import { Component, OnInit } from '@angular/core';
import { PagesService } from '../service/pages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit{

  public allFriend: any[] = []
  constructor(private pageService: PagesService, private snackBar: MatSnackBar){ }

  ngOnInit(): void {
    this.getAllFriend();
  }

  getAllFriend(){
    this.pageService.getAllFriendApiCall().subscribe({
      next: (res:any)=>{
        this.allFriend = res.data;
        // console.log("Data------>", this.allFriend);
        this.snackBar.open('Get All Friend', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        })
      },
      error: (err)=>{
        this.snackBar.open('Error in fetching...', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
      }
    })
  }

  deleteFriend(id: string){
    this.pageService.deleteFriendApiCall(id).subscribe({
      next: (res:any)=>{
        this.snackBar.open(`Delete Successfullt: ${res.message}`, 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.getAllFriend();
      },
      error: (err)=>{
        this.snackBar.open(`Error in deleting: ${err.message}`, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
      }
    })
  }


}
