import { Component } from '@angular/core';
import { PagesService } from '../service/pages.service';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.scss']
})
export class WelcomepageComponent {

  constructor(private pageService:PagesService, private authService:AuthService){}

  ngOnInit(){
    localStorage.clear();
  }
}
