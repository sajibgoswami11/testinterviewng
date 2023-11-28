import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ToastrModule} from 'ngx-toastr';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    ProjectCreateComponent,
    ProjectEditComponent,
    ProjectListComponent
  ]
})
export class ProjectModule { }
