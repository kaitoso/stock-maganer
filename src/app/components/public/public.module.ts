import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { ListaProductosClienteComponent } from './lista-productos-cliente/lista-productos-cliente.component';
import { HorariosComponent } from './horarios/horarios.component';
import { NavModule } from '../nav/nav.module';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    ListaProductosClienteComponent,
    HorariosComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    NavModule,
    MaterialModule,
  ]
})
export class PublicModule { }
