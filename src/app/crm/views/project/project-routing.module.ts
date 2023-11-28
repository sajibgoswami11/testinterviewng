import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';


const routes: Routes = [
  {
    path: '',
    data:{
      title: 'Project'
    },
    children:[
      {
        path:'create',
        component: ProjectCreateComponent,
        data:{
          title: 'Project Create'
        }
      },
      {
        path:'edit',
        component: ProjectEditComponent,
        data:{
          title: 'Project Edit'
        }
      },
      {
        path:'list',
        component: ProjectListComponent,
        data:{
          title: 'Project List'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
