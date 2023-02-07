import { Component, OnInit } from '@angular/core';
import { navItems } from 'src/app/Taskmgt/_nav';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(
              private loginSercice:LoginService,
              private router:Router
              ) { }

  ngOnInit(): void {
  }

  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.loginSercice.logout();
    this.router.navigate(['/login']);
}

}
