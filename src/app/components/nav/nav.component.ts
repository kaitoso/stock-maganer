import { Component, OnInit, OnDestroy } from '@angular/core';
import { BotonService, Boton } from '../../services/boton.service';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  valorBoton;
  valorBotonCambiar;
  trueFalse;
  estadoBoton;
  gatillador = false;
  constructor(private botonService: BotonService,private authService: AuthService, private router: Router) { 
    this.estadoBoton = this.botonService.getBoton().subscribe(res => { this.trueFalse = res.abierto; } );
               
  }
  ngOnDestroy(){
   
    this.estadoBoton.unsubscribe();
    this.valorBoton.unsubscribe();
    if(this.gatillador){
      this.valorBotonCambiar.unsubscribe();
    }
    
    
  }

  ngOnInit() {
    this.valorBoton = this.botonService.getBotonInit().subscribe(res => {this.trueFalse = res.abierto;
    });
  }

  pruebaBoton() {
    this.valorBotonCambiar = this.botonService.getBoton().subscribe(res => { this.trueFalse = res.abierto ; this.gatillador = true;});
    this.botonService.cambiaBoton(this.trueFalse);
 
   }
 
  logout() {
     this.authService.logoutUSer().then((res) => this.router.navigateByUrl('/') );
  }
 
  horarios(){
   this.router.navigate(['/horarios']);
 
  }


}
