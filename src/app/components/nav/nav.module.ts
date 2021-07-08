import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavComponent, SidebarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [NavComponent,NavComponent]
})
export class NavModule { }
