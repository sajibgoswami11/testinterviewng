import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NotLoggedRoutingModule } from "../notLogged/notLogged-routing.module";
import {NgxPaginationModule} from 'ngx-pagination';
import {ToastrModule} from 'ngx-toastr';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {LoginComponent} from '../notLogged/login/login.component'







@NgModule({
    imports: [
      CommonModule,ReactiveFormsModule,
      FormsModule,
      NotLoggedRoutingModule,
      NgxPaginationModule,
      ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-top-right',
        preventDuplicates: false
      }),
      
      NgMultiSelectDropDownModule.forRoot()
    ],
    declarations: [
      LoginComponent
    ]
})
export class NotLoggedModule {}