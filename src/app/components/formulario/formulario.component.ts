import { Component, OnInit, Inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formularioModal',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(public producto: ProductoService, public dialogRef: MatDialogRef<FormularioComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }


  onSaveFormulario() {
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
       this.producto.agregaProducto(nuevoProducto);

    } else {
     this.producto.editaProductos(this.producto.seleccion);
    }
    this.cierra();

  }

  cierra(): void {
    this.dialogRef.close();
  }
}



