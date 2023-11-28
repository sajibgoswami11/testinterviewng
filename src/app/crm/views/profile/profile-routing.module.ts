import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile-section/profile.component';

const routes: Routes = [
  {
    path: '',
    data:{
      title: 'Profile'
    },
    children:[
     
      {
        path:'',
        component: ProfileComponent,
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
export class ProfileRoutingModule { }