import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessPolicyListComponent } from './access-policy-list/access-policy-list.component';
import { AccessPolicyRoutingModule } from './access-policy-routing.module';
import { UserAccessPolicyComponent } from './user-access-policy/user-access-policy.component';
import { UserPrivilegesComponent } from './user-privileges/user-privileges.component';
import { AccessPolicyEditSystemMenuComponent } from './access-policy-edit-system-menu/access-policy-edit-system-menu.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { FormModule } from '@coreui/angular';
import { TreeModule } from 'primeng/tree';

@NgModule({
  imports: [
    CommonModule,
    AccessPolicyRoutingModule,
    ReactiveFormsModule,
    FormsModule,FormModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
      }),
      TreeModule
  ],
  declarations: [
    AccessPolicyListComponent,
    UserAccessPolicyComponent,
    UserPrivilegesComponent,
    AccessPolicyEditSystemMenuComponent
  ]
})
export class AccessPolicyModule { }
