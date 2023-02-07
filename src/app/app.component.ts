import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './Services/login.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo-Skeleton';
  constructor(
    private router: Router,
    private LoginService: LoginService
  ){}
  
ngOnInit(){
  this.router.events.subscribe((evt) => {
    if (!(evt instanceof NavigationEnd)) {
      return;
    }
    window.scrollTo(0, 0);
  });
}

}
