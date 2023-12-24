import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './crm/helpers/auth.guard'
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './crm/views/error/404.component';
import { P500Component } from './crm/views/error/500.component';
import { LoginComponent } from './notLogged/login/login.component';
// import { NotLoggedModule } from './crm/views/profile/profile-section.module';

// import { RegisterComponent } from './views/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component:LoginComponent,
    data: {
      title: 'Login Page'
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
        loadChildren: () => import('./crm/views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'project',
        loadChildren: () => import('./crm/views/project/project.module').then(m => m.ProjectModule),
      },
      // {
      //   path: 'module',
      //   loadChildren: () => import('./crm/views/module/taskmodule.module').then(m => m.TaskModule),
      // },
      {
        path: 'accesspolicy',
        loadChildren: () => import('./crm/views/access-policy/access-policy.module').then(m => m.AccessPolicyModule)
      },
      {
        path: 'profile',
        loadChildren:() => import('./crm/views/profile/profile-section.module').then(m => m.ProfileSectionModule)
        
      },
      {
        path: 'notLogged',
        loadChildren: () =>
          import('./notLogged/notLogged.module').then((m) => m.NotLoggedModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      // {
      //   path: 'pages',
      //   loadChildren: () =>
      //     import('./views/pages/pages.module').then((m) => m.PagesModule)
      // },
    ]
  },
  
  
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
  // {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
