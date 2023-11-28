import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessPolicyListComponent } from './access-policy-list/access-policy-list.component';
import { UserAccessPolicyComponent } from './user-access-policy/user-access-policy.component';
import { UserPrivilegesComponent } from './user-privileges/user-privileges.component';
import { AccessPolicyEditSystemMenuComponent } from './access-policy-edit-system-menu/access-policy-edit-system-menu.component';

const routes: Routes = [
    { path: '',
    data: {
      title: 'accesspolicy'
    },
      children: [
        {
          path: 'list',
          component: AccessPolicyListComponent,
          data: {
            title: 'Access Policy List'
          }
        },
        {
          path: 'systemMenuUpdate',
          component: AccessPolicyEditSystemMenuComponent,
          data: {
            title: 'Access Policy List'
          }
        },
        {
          path: 'rolemenu',
          component: UserAccessPolicyComponent,
          data: {
            title: 'Role Access Policy'
          }
        },
        {
          path: 'user-privileges',
          component: UserPrivilegesComponent,
          data: {
            title: 'User Privileges'
          }
        }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessPolicyRoutingModule { }
