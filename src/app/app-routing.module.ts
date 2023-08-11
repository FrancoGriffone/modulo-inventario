import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { NuevoInventarioComponent } from './components/nuevo-inventario/nuevo-inventario.component';
import { PantallaInventarioComponent } from './components/pantalla-inventario/pantalla-inventario.component';

const routes: Routes = [
//LINK AL HOME
{
  path: '',
  component: InicioComponent,
},
{
  path: '',
  redirectTo: '',
  pathMatch: 'full',
},
//LINK AL NUEVO INVENTARIO
{
  path: 'nuevoinventario',
  component: NuevoInventarioComponent
},
//LINK A LA PANTALLA DEL INVENTARIO
{
  path: 'nuevoinventario/pantallainventario/:inv',
  component: PantallaInventarioComponent
},
//LINK PAGE NOT FOUND
{
  path: '**',
  component: InicioComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
