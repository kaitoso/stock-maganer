import { Component, OnInit, Inject, ViewChild,AfterViewInit,OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ProductoService } from '../../services/producto.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormularioComponent } from '../formulario/formulario.component';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  
import { element } from 'protractor';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {LoteService} from '../../services/lote.service';
import Swal from 'sweetalert2';
import { FormularioStockComponent } from '../formulario-stock/formulario-stock.component';




@Component({
  selector: 'lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(public formbuild: FormBuilder,private loteService:LoteService,public productoService: ProductoService, 
              public dialog: MatDialog) {

                this.listadoProductos = this.productoService.getProductos().subscribe(res => {this.dataSource.data = res;
                  
                } );
                this.loteService.getLotes().subscribe(res => {this.dataLote.data = res;})
              
              
              
              
              }
   
listadoProductos;
panelOpenState = false;
productoDescontarCant;
arregloProductos = [];
productotemporal;
totalprod;
total = 0;
recontarcantidad;
cantidadNueva: number;
cantidadVieja: number;
cantidadmedia: number;
displayedColumns: string[] = ['skud','cod_barra','imagen','marca','linea','nombre','categoria','descripcion','unidad_de_medida', 'cantidad', 'costo','precio', 'acciones'];
displayedColumnsLote: string[] = ['sku','lote','producto','cantidad','fecha', 'costo'];
dataSource = new MatTableDataSource();
dataLote = new MatTableDataSource();
opened = false;
 @ViewChild(MatSort, {static: true}) sort: MatSort;

 @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
 @ViewChild(MatPaginator,{static: false}) paginatorProduct: MatPaginator;

    myForm = new FormGroup({
      canti: new FormControl(''),
      produ: new FormControl({disabled: true})

    });

    
 async ngOnInit() {

  this.myForm.reset({
    produ: {value: '', disabled: true},
    canti: ''
  });
   

    
    
  }


 ngAfterViewInit() {

     this.dataSource.sort = this.sort;
    
     this.dataSource.paginator = this.paginatorProduct;
      // this.dataLote.paginator = this.paginator;
  }

  ngOnDestroy(){
    this.listadoProductos.unsubscribe();
   
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataLote.filter = filterValue.trim().toLowerCase();
  }
  applyFilterLote(filterValue: string) {
    
    this.dataLote.filter = filterValue.trim().toLowerCase();
  }
 

  agrega(element){
     
    this.productoService.seleccion = element;
    this.myForm.reset({
      produ: {value: element.nombre, disabled: true},
      canti: ''
    });

  }

  descuenta(){
   const patron = /^\d*$/;
   this.productoDescontarCant = this.myForm.value.canti;
      
   this.cantidadNueva = Number( this.productoService.seleccion.cantidad - this.myForm.value.canti);
   
       
   this.cantidadVieja  = Number(this.productoService.seleccion.cantidad);
     
    
   if(this.productoDescontarCant > this.cantidadVieja || this.cantidadVieja == 0){
        alert('No hay stock suficiente');
    } else if(this.productoDescontarCant == 0){
      alert('Debe ingresar una cantidad mayor a cero');
    } else{
        this.productotemporal = this.productoService.seleccion;
        
        this.productoService.seleccion.cantidad = this.cantidadNueva;
       
        this.productoService.editaProductos(this.productoService.seleccion);
        
        this.productotemporal.cantidad = this.productoDescontarCant;
        this.arregloProductos.push(this.productotemporal);
                
        this.totalprod = this.productotemporal.cantidad * this.productotemporal.precio;
        this.total = Number(this.totalprod) + Number(this.total);
       
        
        
        
       
        
        
        
        this.myForm.reset({
          produ: {value: '', disabled: true},
          canti: ''
        });
    }
    
  }
  eliminaDescuento(producto){

         let index = this.arregloProductos.indexOf(producto);
         this.totalprod = this.arregloProductos[index].cantidad * this.arregloProductos[index].precio;
         this.total = this.total - this.totalprod;
         
         
         
         this.recontarcantidad = Number(this.arregloProductos[index].cantidad) + Number(this.cantidadNueva);
        
         this.productoService.seleccion.cantidad = this.recontarcantidad;
         
         this.productoService.editaProductos(this.productoService.seleccion);
         if (index > -1) { this.arregloProductos.splice(index, 1) }
         
         

  }

  onEdit(element) {

    this.cleanForm();
    this.abreModal();
    
     if (element) {
      
      this.productoService.seleccion = {...element};
      
    }
  }

  modalImagen(producto){

    if(producto.imagen){
      Swal.fire({
        title: `${producto.nombre}`,
        imageUrl: `${producto.imagen}`,
        imageHeight: 400,
       
      });
    } 
  else{
    Swal.fire({
      title: `${producto.nombre}`,
      imageUrl: `https://pngimg.com/uploads/box/box_PNG100706.png`,
      imageHeight: 400,
     
    });
    
  }
  }
  onStock(element) {

    this.cleanFormstock();
    this.abreModal2();
    
     if (element) {
      
      this.productoService.seleccion = {...element};

    }
  }

  onAdd() {
    this.cleanForm();
    this.abreModal();

  }

  onDelete(id: string) {
    Swal.fire({  
      title: 'Estas seguro de eliminar este producto? los datos borrados ya no se podran recuperar.',  
      text: '¡No podras recuperar este archivo!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Si, Borrarlo',  
      cancelButtonText: 'No, Conservarlo'  
    }).then((result) => {  
      if (result.value) {  
        this.productoService.eliminaProductos(id)
        Swal.fire(  
            'Borrado!',  
            'El producto Fue borrado exitosamente',  
            'success'  
          )  
        
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelado',  
          'El producto NO se ha borrado',  
          'error'  
        )  
      }  
    })  
    // const val = confirm('¿Está seguro que desea eliminar este producto?');
    // if (val) {
   
    // }
  }

  abreModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Modal'
    };
    dialogConfig.autoFocus = true;
    this.dialog.open(FormularioComponent, dialogConfig);
  }
  abreModal2(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Modal'
    };
    dialogConfig.autoFocus = true;
    this.dialog.open(FormularioStockComponent, dialogConfig);
  }

  cleanForm(): void {

    this.productoService.seleccion.imagen = '';
    this.productoService.seleccion.nombre = '';
    this.productoService.seleccion.skud = '';
    this.productoService.seleccion.cod_barra = '';
    this.productoService.seleccion.marca = '';
    this.productoService.seleccion.descripcion = '';
    this.productoService.seleccion.costo = 0;
    this.productoService.seleccion.unidad_de_medida = '';
    this.productoService.seleccion.cantidad = 0;
    this.productoService.seleccion.precio = 0;
    this.productoService.seleccion.id = null;
    this.productoService.seleccion.categoria ='';
    this.productoService.seleccion.linea="";

  }
  cleanFormstock(): void {

    this.loteService.seleccion.lote = '';
    this.loteService.seleccion.skud = '';
    this.loteService.seleccion.costo = 0;
    this.loteService.seleccion.cantidad = 0;
    this.loteService.seleccion.costo = 0;
    this.loteService.seleccion.id = null;

  }



 

 imprimePDF(){
   

   const doc = jsPDF('p', 'pt', 'a4');
   doc.fromHTML(document.getElementById('descuento') , 50, 10);
   doc.save('comprobante');
   this.arregloProductos = [];
   this.total = 0;
   this.totalprod = 0;
 }

}
