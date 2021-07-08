import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoI } from '../models/producto.interface';


export interface ProductoID extends ProductoI {id: string; }

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productoCollection: AngularFirestoreCollection<ProductoI>;
  productos: Observable<ProductoID[]>;

  public seleccion = {
    id: null,
    nombre: '',
    skud: '',
    cod_barra: '',
    marca: '',
    descripcion: '',
    costo: 0,
    unidad_de_medida: '',
    cantidad: 0,
    precio: 0,
    categoria:"",
    linea:""
  };

  constructor(private readonly afs: AngularFirestore) {


    this.productoCollection = afs.collection<ProductoI>('productos');
    this.productos = this.productoCollection.snapshotChanges().pipe(
      map( actions => actions.map(a => {
        const data = a.payload.doc.data() as ProductoI;
        const id =  a.payload.doc.id;
        return {id,  ...data};
      }))
    );
  }


  getProductos() {
    return this.productos;
  }

  editaProductos(producto: ProductoID) {
    // tslint:disable-next-line:one-variable-per-declaration
    const productoeditar: ProductoI = {
       nombre: producto.nombre,
       skud: producto.skud,
       cod_barra: producto.cod_barra,
       marca: producto.marca,
       descripcion: producto.descripcion,
       costo: Number(producto.costo),
       unidad_de_medida: producto.unidad_de_medida,
       cantidad: Number(producto.cantidad),
       precio: Number(producto.precio),
       categoria: producto.categoria,
       linea: producto.linea
    };


    return this.productoCollection.doc(producto.id).update(productoeditar);
  }

  eliminaProductos(id: string) {
    this.productoCollection.doc(id).delete();
  }

  agregaProducto(producto: ProductoI) {
   return this.productoCollection.add(producto);
  }
  getProductoById(id: string){
   return  this.productoCollection.doc(id).valueChanges();
  }
}
