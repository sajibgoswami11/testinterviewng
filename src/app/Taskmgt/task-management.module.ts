import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskManagementRoutingModule } from "./task-management-routing.module";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/Login/login.component";




@NgModule({
    declarations: [
      P404Component,
      P500Component,
      LoginComponent
     
    ],
    imports: [
      CommonModule,
      TaskManagementRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
})
export class TaskManagementModule { }
