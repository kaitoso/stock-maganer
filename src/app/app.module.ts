import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
import { ListaProductosClienteComponent } from './components/public/lista-productos-cliente/lista-productos-cliente.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HorariosComponent } from './components/public/horarios/horarios.component';
import { ClientsComponent } from './components/clients/clients.component';
import { HttpClientModule } from '@angular/common/http';
import { PacksComponent } from './components/packs/packs.component';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavModule } from './components/nav/nav.module';
import { PublicModule } from './components/public/public.module';


const firebaseConfig =  {
  apiKey: "AIzaSyBIE5abP6PCuoBMq-8hciJaoTTawkpToRk",
  authDomain: "aplicacion-stock.firebaseapp.com",
  projectId: "aplicacion-stock",
  storageBucket: "aplicacion-stock.appspot.com",
  messagingSenderId: "780056274035",
  appId: "1:780056274035:web:31daff23ae20c43da03606",
  measurementId: "G-YQF9XY608B" };

@NgModule({
  declarations: [
    AppComponent,
    
    FormularioComponent,
    ToolbarComponent,

  
    PacksComponent,
    
  ],
  imports: [
    HttpClientModule, 
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NavModule,
    PublicModule
  ],
  providers: [AngularFireAuth, AuthService, AuthGuard, AngularFireModule],
  bootstrap: [AppComponent],
  entryComponents: [FormularioComponent]
})
export class AppModule { }
