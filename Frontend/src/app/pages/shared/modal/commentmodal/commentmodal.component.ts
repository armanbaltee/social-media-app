import { Component, Inject, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PagesService } from 'src/app/pages/service/pages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-commentmodal',
  templateUrl: './commentmodal.component.html',
  styleUrls: ['./commentmodal.component.scss']
})
export class CommentmodalComponent implements OnInit , OnDestroy{
  commentForm!: FormGroup;
  comments: any[] = [];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  public commentLength: number = 0

  constructor(
    private fb: FormBuilder,
    private pageService: PagesService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CommentmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: any }
  ) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });

    this.getComments();
  }

  get post() {
    return this.data.post;
  }

  isImage(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  getComments() {
    this.pageService.getCommentsApiCall(this.post.id).subscribe({
      next: (res: any) => {
        this.comments = res.comment;
        this.commentLength = this.comments.length;
        console.log('Comments--->', this.comments)
        setTimeout(() => this.scrollToBottom(), 0);
      },
      error: () => {
        this.snackBar.open('Failed to load comments', 'Close', { duration: 3000 });
      }
    });
  }

  submitComment() {
    const commentData = {
      postId: this.post.id,
      text: this.commentForm.get('comment')?.value
    };
    // console.log("Comment-------->", commentData)

    this.pageService.createCommentApiCall(commentData).subscribe({
      next: () => {
        this.snackBar.open('Comment added!', 'Close', { duration: 2000 });
        this.commentForm.reset();
        this.commentLength++;
        this.dialogRef.close(this.commentLength);
        // this.getComments();
      },
      error: () => {
        this.snackBar.open('Failed to post comment', 'Close', { duration: 3000 });
      }
    });
  }

  ngOnDestroy(): void {
  this.dialogRef.close(this.commentLength);
}

}
