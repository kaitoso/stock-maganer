import { Component, OnInit,DoCheck, OnDestroy, HostBinding } from '@angular/core';
import { BotonService, Boton } from '../../services/boton.service';
import { AuthService } from '../../services/auth.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit,DoCheck, OnDestroy {

  @HostBinding('class') cssClassTheme: any;
  valorTheme = false;
  valorBoton;
  valorBotonCambiar;
  trueFalse;
  estadoBoton;
  gatillador = false;
  activado = 'false';


  constructor(public overlayContainer: OverlayContainer,private botonService: BotonService,private authService: AuthService, private router: Router) { 
    this.estadoBoton = this.botonService.getBoton().subscribe(res => { this.trueFalse = res.abierto; } );
               
  }
  llamatheme(){
    if (this.valorTheme) {
       this.onsetTheme('dark-theme');

    }else{
      this.onsetTheme('light-theme');
    }
  }

  public onsetTheme(e: string){
    this.overlayContainer.getContainerElement().classList.add(e);
    this.cssClassTheme = e;
  }
  ngDoCheck(): void {
    
    this.activado = localStorage.getItem('activado') || "false";

  }
  ngOnDestroy(){
   
    this.estadoBoton.unsubscribe();
    this.valorBoton.unsubscribe();
    if(this.gatillador){
      this.valorBotonCambiar.unsubscribe();
    }
    
    
  }

  

  ngOnInit() {
    
    this.activado = localStorage.getItem('activado') || "false";
    this.valorBoton = this.botonService.getBotonInit().subscribe(res => {this.trueFalse = res.abierto;
    });
  }

  pruebaBoton() {
    this.valorBotonCambiar = this.botonService.getBoton().subscribe(res => { this.trueFalse = res.abierto ; this.gatillador = true;});
    this.botonService.cambiaBoton(this.trueFalse);
 
   }
 
  logout() {
     localStorage.removeItem('activado');
     this.activado = 'false';
     this.authService.logoutUSer().then((res) => this.router.navigateByUrl('/') );
  }
 
  horarios(){
   this.router.navigate(['/horarios']);
 
  }
  login(){
    this.router.navigate(['/admin/lista-productos']);
}




}
