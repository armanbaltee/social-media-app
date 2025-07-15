import { Component, Input } from '@angular/core';
import { PagesService } from '../../service/pages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  @Input() post: any;
  getUserToken = this.pageService.getUserId();

  constructor(private pageService: PagesService, private snackBar: MatSnackBar) {}

  likePost(postId: string): void {
    const payload = { userId: this.getUserToken };

    this.pageService.postLikedApiCall(postId, payload).subscribe({
      next: (res: any) => {
        if (this.post.isLiked) {
          this.post.isLiked = false;
          this.post.likeCount--;
          this.snackBar.open('Like removed', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          })
        } else {
          this.post.isLiked = true;
          this.post.likeCount++;
          this.snackBar.open('Post liked', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          })
        }
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', {
          duration: 3000,
          panelClass: ['error.snackabr']
        })
      }
    });
  }

  toggleComments(postId: string): void {
    
  }

  sharePost(postId: string): void {
    
  }
}
