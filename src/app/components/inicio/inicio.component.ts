import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  constructor(private router: Router){}
  
  nuevoInventario(){
    this.router.navigate(["/nuevoinventario"])
  }
}
