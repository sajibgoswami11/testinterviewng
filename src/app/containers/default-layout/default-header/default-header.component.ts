import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { LoginService } from 'src/app/crm/services/login.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  router: any;

  constructor(private classToggler: ClassToggleService,
              private loginService: LoginService
  ) {
    super();
  }
  
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
