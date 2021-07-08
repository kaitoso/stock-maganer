import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ClientsComponent } from './clients/clients.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NavComponent } from './nav/nav.component';
import { NavModule } from './nav/nav.module';
import { FormularioStockComponent } from './formulario-stock/formulario-stock.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListaProductosComponent,
    ClientsComponent,
    FormularioStockComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavModule
   


  ],
  exports:[]
})
export class AdminModule { }
