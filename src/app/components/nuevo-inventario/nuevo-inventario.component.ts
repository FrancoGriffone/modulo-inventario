import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepositosInterface } from 'src/app/models/depositos.interface';
import { MarcasInterface } from 'src/app/models/marcas.interface';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-nuevo-inventario',
  templateUrl: './nuevo-inventario.component.html',
  styleUrls: ['./nuevo-inventario.component.scss']
})
export class NuevoInventarioComponent {

  idMarcas: any = [] //ARRAY CON ID DE MARCAS EN NUMBER
  
  idDeposito: any = "" //ID DEPOSITO

  fecha = new Date().toISOString().substring(0,10) //FECHA PARA FORM

  marcas: any //PARA OBTENER LAS MARCAS

  depositos: any //PARA OBTENER LOS DEPOSITOS

  marcaSeleccionada: any //PARA ESTABLECER LA MARCA INDIVIDUALMENTE

  marcasSeleccionadas: MarcasInterface[] = [] //PARA SETEAR TODAS LAS MARCAS

  depositoSeleccionado: any //PARA ESTABLECER EL DEPOSITO

  comenzar(){
    this.marcasSeleccionadas.forEach((value)=>{
      this.idMarcas.push(value.id)
    })
    this.profileForm.value.marcas = this.idMarcas
    this.profileForm.value.deposito = this.idDeposito
    let inventario = {
      Fecha: this.profileForm.value.fecha,
      Nombre: this.profileForm.value.nombreInventario,
      Marcas: this.profileForm.value.marcas,
      Deposito: this.profileForm.value.deposito
    }
    if(this.idDeposito != "" && this.idMarcas.length !== 0){
      this.api.nuevoInvetario(inventario).subscribe((data)=>{
        console.log(data)
      })
      this.router.navigate(["nuevoinventario/pantallainventario/" + this.profileForm.value.nombreInventario])
    } else if (this.idDeposito == "" && this.idMarcas.length !== 0){
      this.toastrSvc.warning('No seleccionaste ningún depósito')
    } else {
      this.toastrSvc.warning('No seleccionaste ninguna marca')
    }
  }

  findMarca(id: any){
    return this.marcas.find((x: MarcasInterface) => x.id == id);
  }

  findMarcaSeleccionada(id: any){
    return this.marcasSeleccionadas.find((x: MarcasInterface) => x.id == id);
  }

  agregarMarca(){
    this.marcaSeleccionada = this.findMarca(this.marca.value)
    if(this.findMarcaSeleccionada(this.marca.value) == undefined){
      this.toastrSvc.success(`¡Se añadió la marca: ${this.marcaSeleccionada.marca} correctamente!`)
      this.marcasSeleccionadas.push(this.marcaSeleccionada)
    } else {
      this.toastrSvc.error('No puedes ingresar una marca que ya habías ingresado anteriormente')
    }
  }

  findDeposito(id: any){
    return this.depositos.find((x: DepositosInterface) => x.id == id);
  }

  agregarDeposito(){
    this.depositoSeleccionado = this.findDeposito(this.depo.value)
    this.idDeposito = this.depositoSeleccionado.id
  }

  //FORM CONTROLS PARA USO DE LA PAGINA
  marca = new FormControl('');
  depo = new FormControl('')

  //FORMULARIO PARA CREAR INVENTARIO
  profileForm = new FormGroup({
    nombreInventario: new FormControl('', Validators.required),
    fecha: new FormControl(this.fecha, Validators.required),
    marcas: new FormControl(this.idMarcas),
    deposito: new FormControl(this.idDeposito)
  });

  constructor(private router: Router, private api: ApiService, private toastrSvc: ToastrService){}

  ngOnInit(): void {
    //PARA OBTENER LAS MARCAS
    this.api.obtenerMarcas().subscribe((data)=>{
      this.marcas = data
    })
    //PARA OBTENER LOS DEPOSITOS
    this.api.obtenerDepositos().subscribe((data)=>{
      this.depositos = data
    })
  }
}
