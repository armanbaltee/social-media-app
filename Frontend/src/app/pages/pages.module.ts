import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';

import { PagesRoutingModule } from './pages-routing.module';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActionComponent } from './homepage/action/action.component';
import { PostmodalComponent } from './shared/modal/postmodal/postmodal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FriendlistComponent } from './friendlist/friendlist.component';

@NgModule({
  declarations: [
    WelcomepageComponent,
    HomepageComponent,
    HeaderComponent,
    ActionComponent,
    PostmodalComponent,
    FriendlistComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ]
})
export class PagesModule { }
