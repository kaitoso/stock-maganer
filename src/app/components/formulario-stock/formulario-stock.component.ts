import { Component, OnInit, Inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { LoteService } from 'src/app/services/lote.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import swal from'sweetalert2';
@Component({
  selector: 'app-formulario-stock',
  templateUrl: './formulario-stock.component.html',
  styleUrls: ['./formulario-stock.component.css']
})
export class FormularioStockComponent implements OnInit {

 
    titularAlerta:string='';
    checkProducto:boolean = false;
    isReadOnly;
    isReadOnlyLote;
     constructor(public lote: LoteService,public producto: ProductoService, public dialogRef: MatDialogRef<FormularioStockComponent>,
                 @Inject(MAT_DIALOG_DATA) data) { }
   
     ngOnInit() {

       this.isReadOnly = false;

       this.isReadOnlyLote=false;
   
   
     }
   
   
     onSaveFormulario() {
       if (this.lote.seleccion.lote) {
       if (this.lote.seleccion.id == null) {
   
      
            
          
          // tslint:disable-next-line:prefer-const
          let nuevoLote = {

           cantidad: Number(this.lote.seleccion.cantidad),
           costo: Number(this.lote.seleccion.costo),
           fecha: new Date(this.lote.seleccion.fecha),
           idProducto: this.producto.seleccion.id,
           lote: this.lote.seleccion.lote,
           skud: this.producto.seleccion.skud,
           nombreProd: this.producto.seleccion.nombre

         };
         let nuevoProducto = {
          id: this.producto.seleccion.id,
          imagen: this.producto.seleccion.imagen,
          nombre: this.producto.seleccion.nombre,
          skud: this.producto.seleccion.skud,
          cod_barra: this.producto.seleccion.cod_barra,
          marca : this.producto.seleccion.marca,
          descripcion: this.producto.seleccion.descripcion,
          costo: this.producto.seleccion.costo,
          unidad_de_medida: this.producto.seleccion.unidad_de_medida,
          cantidad: Number(this.producto.seleccion.cantidad)+Number(this.lote.seleccion.cantidad),
          precio: Number(this.producto.seleccion.precio),
          categoria:this.producto.seleccion.categoria,
          linea: this.producto.seleccion.linea
  
  
        };
        console.log("nuevoprod", nuevoProducto);
        
          console.log('nuevo', nuevoLote);
          this.lote.agregaLote(nuevoLote).then(res =>{
            this.producto.editaProductos(nuevoProducto).then(resp=>{
              console.log("desde firebase",resp)
              swal.fire('El registro fue ingresado correctamente', this.titularAlerta, 'success');
            });
           
           
          });
         
   
       } else {
        this.lote.editaLote(this.lote.seleccion);
       }
   
       this.cierra();
   
       }else{
         swal.fire('El registro debe tener almenos un nombre de lote', this.titularAlerta, 'error');
        
       }
      
   
     }
   
     cierra(): void {
       this.dialogRef.close();
     }
}
