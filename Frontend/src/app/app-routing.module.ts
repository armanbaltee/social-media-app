import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';

const routes: Routes = [
  {
    path: '', component: WelcomepageComponent
  },
  
  {
    path: 'pages',
    loadChildren: ()=> import("./pages/pages.module").then(m=>m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
