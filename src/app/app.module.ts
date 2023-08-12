import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//MATERIAL UI
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDatepickerModule } from '@angular/material/datepicker';
//FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//TOASTR
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NuevoInventarioComponent } from './components/nuevo-inventario/nuevo-inventario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PantallaInventarioComponent } from './components/pantalla-inventario/pantalla-inventario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaInventariosComponent } from './components/lista-inventarios/lista-inventarios.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NuevoInventarioComponent,
    PantallaInventarioComponent,
    NavbarComponent,
    ListaInventariosComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
