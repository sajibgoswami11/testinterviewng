import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile-section/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import {MatTabsModule} from '@angular/material/tabs'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,ReactiveFormsModule,
    MatTabsModule,
  ],
  declarations: [ProfileComponent]
})
export class ProfileSectionModule { }
