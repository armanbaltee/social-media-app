import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { pageGuard } from './guard/page.guard';
import { FriendlistComponent } from './friendlist/friendlist.component';
import { FriendrequestComponent } from './friendrequest/friendrequest.component';
import { FriendComponent } from './friend/friend.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()=> import("../auth/auth.module").then(m=>m.AuthModule)
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [pageGuard]
  },
  {
    path: 'friends',
    component: FriendlistComponent,
    canActivate: [pageGuard]
  },
  {
    path: 'friendrequest',
    component: FriendrequestComponent,
    canActivate: [pageGuard]
  },
  {
    path: 'friendpage',
    component: FriendComponent,
    canActivate: [pageGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
