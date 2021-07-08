import { Component, OnInit, Inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { LoteService } from 'src/app/services/lote.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import swal from'sweetalert2';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formularioModal',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
 
 titularAlerta:string='';
 checkProducto:boolean = false;
 isReadOnly;
 isReadOnlyLote;
  constructor(public lote: LoteService,public producto: ProductoService, public dialogRef: MatDialogRef<FormularioComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
    
    this.isReadOnly = false;

    this.isReadOnlyLote=false;


  }


  onSaveFormulario() {
    if (this.producto.seleccion.nombre) {
    if (this.producto.seleccion.id == null) {

   
         
       
       // tslint:disable-next-line:prefer-const
       let nuevoProducto = {

        nombre: this.producto.seleccion.nombre,
        skud: this.producto.seleccion.skud,
        cod_barra: this.producto.seleccion.cod_barra,
        marca : this.producto.seleccion.marca,
        descripcion: this.producto.seleccion.descripcion,
        costo: this.producto.seleccion.costo,
        unidad_de_medida: this.producto.seleccion.unidad_de_medida,
        cantidad: Number(this.producto.seleccion.cantidad),
        precio: Number(this.producto.seleccion.precio),
        categoria:this.producto.seleccion.categoria,
        linea: this.producto.seleccion.linea


      };
       console.log('nuevo', nuevoProducto);
       this.producto.agregaProducto(nuevoProducto).then(res =>{
        swal.fire('El registro fue ingresado correctamente', this.titularAlerta, 'success');
       });
      

    } else {
     this.producto.editaProductos(this.producto.seleccion);
    }

    this.cierra();

    }else{
      swal.fire('El registro debe tener almenos un nombre', this.titularAlerta, 'error');
     
    }
   

  }

  cierra(): void {
    this.dialogRef.close();
  }
}



