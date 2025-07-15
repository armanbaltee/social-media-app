import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PagesService } from 'src/app/pages/service/pages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-postmodal',
  templateUrl: './postmodal.component.html',
  styleUrls: ['./postmodal.component.scss']
})
export class PostmodalComponent {
   postForm!: FormGroup;
  filesCollection: File[] = [];
  previewUrls: string[] = [];

  constructor(
    private fb: FormBuilder,
    private pageService: PagesService,
    private dialogRef: MatDialogRef<PostmodalComponent>,
    private snackBar: MatSnackBar
  ) {
    this.postForm = this.fb.group({
      description: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let file of Array.from(input.files)) {
        this.filesCollection.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => this.previewUrls.push(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  }

  removeFile(index: number): void {
  this.previewUrls.splice(index, 1);
  this.filesCollection.splice(index, 1);
  this.snackBar.open("Post removed successfully", 'Close', {
    duration: 3000,
    panelClass:['success-snackabr']
  })
}


  submitPost(): void {


    const formData = new FormData();
    formData.append('description', this.postForm.get('description')?.value);
    this.filesCollection.forEach(file => {
      formData.append('media', file);
    });

    this.pageService.createPostApiCall(formData).subscribe({
      next: () => {
        this.dialogRef.close(true); 
      },
      error: (err) => {
        this.snackBar.open(`Error while uploading`, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        })
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(false); 
  }
}
