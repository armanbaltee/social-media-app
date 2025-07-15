import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagesService } from '../service/pages.service';
import { PostmodalComponent } from '../shared/modal/postmodal/postmodal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  postForm!: FormGroup;
  getUserToken: any = this.pageService.getUserId();
  selectedFileName: string | null = null;
  postDatas: any[] = [];
  noOfPostLike: number = 0;
  noOfPostComment:number = 0;
  noOfPostShare: number  = 0;

  previewUrls: string[] = [];

  filesCollection: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pageService: PagesService,
     private dialog: MatDialog,
     private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cretaePostData();
    this.getData();
    this.postDatas.forEach((el)=>{
      // this.getLikes(el._id);
      console.log(el._id)
    })
  }

  openPostDialog(): void {
    const dialogRef = this.dialog.open(PostmodalComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.getData(); 
      }
    });
  }


  cretaePostData() {
    this.postForm = this.formBuilder.group({
      description: [''],
    });
  }


  submitPost(): void {
    if (this.postForm.invalid || !this.filesCollection) {
      return alert('Invalid data');
    }

    const formData = new FormData();
    formData.append('description', this.postForm.get('description')?.value);
    this.filesCollection.forEach((file, index) => {
      formData.append('media', file);
    });
    this.pageService.createPostApiCall(formData).subscribe({
      next: (res: any) => {
        this.getData();
        this.postForm.reset();
        this.filesCollection = [];
        this.previewUrls = [];
        this.snackBar.open('Data saved successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        console.log('err', err.message);
        this.snackBar.open(`Error while uploading: ${err.message}`, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
      },
    });
  }

  getData() {
    this.pageService.getPostApiCall().subscribe({
      next: (res: any) => {
        this.postDatas = res.viewModel;
        this.snackBar.open(`Data load successfully ${res.message}`, 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        })
        console.log(this.postDatas)
      },
      error: (err) => {
        this.snackBar.open(`Error is: ${err.message}`, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
      },
    });
  }

  deletePost(id: String) {
    this.pageService.deletePostApiCall(id).subscribe({
      next: (res: any) => {
        this.snackBar.open(`${res.message}`, 'Close', {
          duration:3000,
          panelClass: ['success-snackbar']
        })
        this.getData();
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
      },
    });
  }

  openedMenuPostId: string | null = null;

toggleMenu(postId: string): void {
  this.openedMenuPostId = this.openedMenuPostId === postId ? null : postId;
}

updatePost(id: any){}
}
