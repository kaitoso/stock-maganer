import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ClientsComponent } from './clients/clients.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';


const routes: Routes = [{
  path: '',component: AdminComponent,
  children: [
    {path:'lista-productos', component: ListaProductosComponent},
    {path:'clientes',component: ClientsComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
