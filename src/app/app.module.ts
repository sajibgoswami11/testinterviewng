import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Taskmgt/common/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';


// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr'

// Custom Import

// import { SignupComponent } from './Taskmgt/views/signup/signup.component';
import { LoginService } from './Taskmgt/Services/login.service';
import { EncryptionDescryptionService } from './Taskmgt/Services/encryption-descryption.service';
import { AuthGuard } from './Taskmgt/Helpers/auth.guard';
import { AuthInterceptor } from './Taskmgt/Helpers/auth.interceptor';
import { DefaultLayoutComponent } from './Taskmgt/containers';
import { TaskManagementModule } from './Taskmgt/task-management.module';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


// Import containers


const APP_CONTAINERS = [
  DefaultLayoutComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS
    
  ],
  imports: [
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,TaskManagementModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
  ],
  providers: [
    LoginService,
    EncryptionDescryptionService,
     AuthGuard,
     {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
       multi: true
     },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
