import { Injectable } from '@angular/core';
import { DepositosInterface } from '../models/depositos.interface';
import { HttpClient } from '@angular/common/http';
import { MarcasInterface } from '../models/marcas.interface';
import { Observable } from 'rxjs';
import { InventarioInterface } from '../models/inventario.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private GET_MARCAS = 'http://192.168.0.9:100/api/inventario/marcas'

  private GET_DEPOSITOS = 'http://192.168.0.9:100/api/inventario/depositos'

  private POST_INVENTARIO = 'http://192.168.0.9:100/api/inventario/nuevo'

  constructor(private http: HttpClient) { }

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
}
