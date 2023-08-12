import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ListaInventarioInterface } from 'src/app/models/listaInventario.interface';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-pantalla-inventario',
  templateUrl: './pantalla-inventario.component.html',
  styleUrls: ['./pantalla-inventario.component.scss']
})
export class PantallaInventarioComponent {

  //<---------------------------------------------------------------------------------------------------------->
  
  //DATA PARA IR SETEANDO VALORES

  nombre: any //PARA OBTENER EL NOMBRE DEL INVENTARIO

  idInventario: any //ID INVENTARIO

  inventarios: any //PARA OBTENER LA LISTA DE INVENTARIOS

  inventario: any //PARA OBTENER LOS DATOS DEL INVENTARIO PUNTUAL

  prod: any //PARA OBTENER EL PRODUCTO

  prodFichados: any[] = [] //PARA SETEAR LOS PRODUCTOS QUE VAMOS FICHANDO

  contadorFichados: number = 0 //CONTADOR FICHADOS
  
  contadorErrores: number = 0 // CONTADOR ERRORES

  //<---------------------------------------------------------------------------------------------------------->


  //FUNCION PARA FICHAR EL PRODUCTO
  ficharProd(){
    this.api.cargarProducto(this.profileForm.value.fichador).pipe(catchError((errors: HttpErrorResponse)=>{
      //SI NO EXISTE, TOMA EL ERROR Y DA LA NOTIFICACION
      this.toastrSvc.error(`Hubo un error al momento de intentar cargar ${this.profileForm.value.fichador}`)
      //TRANSFORMA EL PROD A UNDEFINED
      this.prod = undefined
      //SUMA +1 A LOS ERRORES
      this.contadorErrores = this.contadorErrores + 1
      return throwError(errors);
    })).subscribe((data)=>{
      //TIRAMOS EL STRING AL PROD
      this.prod = data
      //NOTIFICACION CON DETALLE DE LO QUE SE SUMA
      this.toastrSvc.success(`¡Se añadió ${this.profileForm.value.fichador} - ${this.prod} correctamente!`)
      //SUMAMOS AL ARRAY EL STRING DEL CODIGO
      this.prodFichados?.push(this.profileForm.value.fichador)
      //SUMAMOS +1 A FICHADOS
      this.contadorFichados = this.contadorFichados + 1
    })
  }

  //FUNCION PARA BUSCAR UN INVENTARIO
  findInventario(nombre: string){
    return this.inventarios?.find((x: ListaInventarioInterface) => x.nombre === nombre);
  }

  //FUNCION PARA FINALIZAR EL DETALLE DE INVENTARIO
  finalizar(){
    //SI EL CONTADOR DE PRODUCTOS ESTA EN 0
    if(this.contadorFichados == 0){
      this.toastrSvc.warning('No se puede guardar el detalle del inventario sin fichar ningún producto')
    } else {
      //OBJETO QUE PASAMOS A LA API
      let inventario = {
        InventarioId: this.idInventario,
        CodUbicacion: this.profileForm.value.ubicacion,
        Ubicacion: this.profileForm.value.nombre,
        SKUs: this.prodFichados,
      }
      this.api.crearDetalleInventario(inventario).subscribe((data)=>{
        console.log(data)
      })
    }
  }

  //FORMULARIO PARA RECLAMO INTERNO
  profileForm = new FormGroup({
    ubicacion: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    fichador: new FormControl(''),
    contadorFichados: new FormControl(this.contadorFichados),
    contadorErrores: new FormControl(this.contadorErrores)
  });


  constructor(private api: ApiService, private toastrSvc: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.api.obtenerInventarios().subscribe((data)=>{
      this.inventarios = data
      this.inventario = this.findInventario(this.nombre)
      this.idInventario = this.inventario.id
    })
    this.nombre = this.route.snapshot.paramMap.get('inv') || ''
  }
}
