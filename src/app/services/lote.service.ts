import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection  } from '@angular/fire/firestore';
import {Lote} from '../models/lote.interface';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoService } from './producto.service';
export interface LoteID extends Lote {id: string;}
@Injectable({
  providedIn: 'root'
})

export class LoteService {
  private loteCollection: AngularFirestoreCollection<Lote>;
  lotes: Observable<LoteID[]>;

  public seleccion = {

    id: null,
    idProducto:'',
    lote: '',
    skud: '',
    costo: 0,
    cantidad: 0,
    fecha:new Date(),
    nombreProd: ''

  };


  constructor(private producto: ProductoService,private readonly afs: AngularFirestore) { 
    this.loteCollection = afs.collection<Lote>('entradas');
    this.lotes = this.loteCollection.snapshotChanges().pipe(
      map( actions => actions.map(a => {
        const data = a.payload.doc.data() as Lote;
        const id =  a.payload.doc.id;
        return {id,  ...data};
      }))
    );
 
  }

  getLotes() {
    return this.lotes;
  }
  editaLote(lote: LoteID) {
      // tslint:disable-next-line:one-variable-per-declaration

      const loteEditar: Lote = {

        idProducto: lote.idProducto,
        lote: lote.lote,
        skud: lote.skud,
        costo: lote.costo,
        cantidad: lote.cantidad,
        fecha: lote.fecha,
        nombreProd: lote.nombreProd
     };
 
 
     return this.loteCollection.doc(lote.id).update(loteEditar); 
    }

  agregaLote(lote: Lote) {
      // this.producto.getProductoById(lote.idProducto).subscribe((res:any) => {return lote.nombreProd = res.nombre});
      console.log("producto en lote",lote.nombreProd);
      
     
    return this.loteCollection.add(lote);
   }
  
}
