import { Component } from '@angular/core';

import { navItems } from './_nav';
import { INavData } from '@coreui/angular';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EmployeeListService } from 'src/app/crm/services/employee-list.service';
import { LoginService } from 'src/app/crm/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  rootParentId: any;
  chkNotpushToNav = 0;
  flagChkNotPushTonav = false;
  constructor(
              private loginSercice: LoginService,
              private router: Router,
              private menuUri: EmployeeListService
              ) {
                this.items$ = this.getSidebarItems();

               }
  navItems: INavData [] =  new Array<INavData >();
  navItemsChildren: INavData [] =  new Array<INavData >();
  navItemsChildParent: INavData [] =  new Array<INavData >();
  title!: boolean;
  items$: Observable<INavData[]>;
  public userRole: any;
  // tslint:disable-next-line:member-ordering
  public CurrentYear: number = new Date().getFullYear();

  // tslint:disable-next-line:member-ordering
  public sidebarMinimized = false;
  // public navItems = navItems;

  private getSidebarItems(): Observable< INavData []> {
    let cntmenusforPR = 0;
    let menuUriData: any;
    let menuUriDataString:any = localStorage.getItem('userMenuData');
    menuUriData = JSON.parse(menuUriDataString);

    this.rootParentId = menuUriData.sort();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < menuUriData.length; i++)
    {
      if (menuUriData[i].userMenuFile === null)
      {
        menuUriData[i].userMenuFile = menuUriData[i].userMenuTitle;
      }
      // finding possible roots
      if (menuUriData[i].menuType === 'GR')
      {
        const parentChildArr = this.rootParentId.filter((item: { parentMenuId: any; }) => item.parentMenuId === menuUriData[i].userMenuId );
 //#region sub mod

        for (let j = 0; j < parentChildArr.length; j++) {
          const menuChildArr = this.rootParentId.filter((item: { parentMenuId: any; }) => item.parentMenuId === parentChildArr[j].userMenuId);
          console.log(parentChildArr);
          // tslint:disable-next-line: prefer-for-of
          for (let k = 0; k < menuChildArr.length; k++) {

                this.navItemsChildren.push(
                  {
                    name: menuChildArr[k].userMenuTitle,
                    url: menuChildArr[k].userMenuFile,
                    icon: 'icon-arrow-right-circle'
                  }
                );

           }

          if (parentChildArr[j].userMenuFile === null)
           {
            parentChildArr[j].userMenuFile = parentChildArr[j].userMenuTitle;
           }
          console.log(this.navItemsChildren);
          this.navItemsChildParent.push(
                  {
                      name: parentChildArr[j].userMenuTitle,
                      url: parentChildArr[j].userMenuFile,
                      icon: 'icon-arrow-right-circle',
                      children: this.navItemsChildren
                  }
             );
          // break;
         }
        // console.log(this.navItemsChildParent);

        this.navItems.push(
            {
              name: menuUriData[i].userMenuTitle,
              url: menuUriData[i].userMenuFile,
              icon: 'icon-arrow-right-circle',
              children:  this.navItemsChildParent
            }
          );
 //#endregion
      }
    }
    // console.log(this.navItems);
    return of(this.navItems);
  }

  ngOnInit(): void {

  }
  toggleMinimize(e:any) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.loginSercice.logout();
    this.router.navigate(['/login']);
  }
}
