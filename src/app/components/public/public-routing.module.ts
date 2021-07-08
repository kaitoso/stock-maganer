import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorariosComponent } from './horarios/horarios.component';
import { ListaProductosClienteComponent } from './lista-productos-cliente/lista-productos-cliente.component';


const routes: Routes = [
  {
    path: '',component: ListaProductosClienteComponent,
    children: [
      {path:'horarios', component: HorariosComponent},
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
