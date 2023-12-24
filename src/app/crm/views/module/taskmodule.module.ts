import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TaskmoduleRouting } from './taskmodule-routing';
import { ModuleCreateComponent } from './module-create/module-create.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleEditComponent } from './module-edit/module-edit.component';

@NgModule({
  declarations: [
    ModuleCreateComponent,
    ModuleListComponent,
    ModuleEditComponent
  ],
  imports: [
    CommonModule,
    TaskmoduleRouting,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
    timeOut: 5000,
    positionClass: 'toast-top-right',
    preventDuplicates: false
    }),
   ]
})

export class TaskModule { }

