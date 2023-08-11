import { Injectable } from '@angular/core';
import { DepositosInterface } from '../models/depositos.interface';
import { HttpClient } from '@angular/common/http';
import { MarcasInterface } from '../models/marcas.interface';
import { Observable } from 'rxjs';
import { InventarioInterface } from '../models/inventario.interface';
import { ListaInventarioInterface } from '../models/listaInventario.interface';
import { DetalleInventarioInterface } from '../models/detalleInventario.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private GET_PRODUCTOS_IND = 'http://192.168.0.9:100/api/reclamos/productos/'

  private GET_MARCAS = 'http://192.168.0.9:100/api/inventario/marcas'

  private GET_DEPOSITOS = 'http://192.168.0.9:100/api/inventario/depositos'

  private POST_INVENTARIO = 'http://192.168.0.9:100/api/inventario/nuevo'

  private GET_LISTA_INVENTARIOS = 'http://192.168.0.9:100/api/inventario/lista'

  private POST_DETALLE_INVENTARIO = 'http://192.168.0.9:100/api/inventario/detalle'

  constructor(private http: HttpClient) { }

  cargarProducto(prod: any) {
    const url = this.GET_PRODUCTOS_IND + prod;
    return this.http.get(url, {responseType: 'text'})
  }

  obtenerMarcas(){
    const url = this.GET_MARCAS;
    return this.http.get<MarcasInterface>(url)
  }

  obtenerDepositos() {
    const url = this.GET_DEPOSITOS;
    return this.http.get<DepositosInterface>(url)
  }

  nuevoInvetario(inventario: Object): Observable<InventarioInterface>{
    const url = this.POST_INVENTARIO;
    return this.http.post<InventarioInterface>(url, inventario)
  }

  obtenerInventarios(){
    const url = this.GET_LISTA_INVENTARIOS;
    return this.http.get<ListaInventarioInterface>(url)
  }

  crearDetalleInventario(detalle: Object): Observable<DetalleInventarioInterface>{
    const url = this.POST_DETALLE_INVENTARIO;
    return this.http.post<DetalleInventarioInterface>(url, detalle)
  }
}
