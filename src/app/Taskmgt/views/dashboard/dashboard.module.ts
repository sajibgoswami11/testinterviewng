import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { DashboardComponent } from "./dashboard.component";
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgModule } from "@angular/core";
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule, 
    BsDropdownModule,DashboardRoutingModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }