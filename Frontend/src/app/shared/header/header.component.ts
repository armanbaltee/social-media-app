import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router){}
  login(){
    this.router.navigate(['/login'])
  }
  signup(){
    this.router.navigate(['/signup'])
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/'])
  }

  friendPage(){
    return this.router.navigate(['/friends'])
  }
}
