import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { DefaultLayoutComponent } from "./containers";
import { AuthGuard } from "./Helpers/auth.guard";
import { LoginComponent } from "./views/Login/login.component";

export const routes : Routes = [
    {
        path:'login',
        component:  LoginComponent,
        data:{
            title:'Login  Page'
        }
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Home'
        },
        children: [
          {
            path: 'dashboard',
            loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
          },
          {
            path: 'project',
            loadChildren: () => import('./views/project/project.module').then(m => m.ProjectModule),
          }
          
        ]
    }
];

@NgModule({
    declarations:[
    ],
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export  class TaskManagementRoutingModule {}