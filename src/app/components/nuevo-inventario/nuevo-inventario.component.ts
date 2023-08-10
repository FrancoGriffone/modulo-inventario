import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-inventario',
  templateUrl: './nuevo-inventario.component.html',
  styleUrls: ['./nuevo-inventario.component.scss']
})
export class NuevoInventarioComponent {

  constructor(private router: Router){}

  comenzar(){
    this.router.navigate(["nuevoinventario/pantallainventario"])
  }
}
