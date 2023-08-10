import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaInventarioComponent } from './pantalla-inventario.component';

describe('PantallaInventarioComponent', () => {
  let component: PantallaInventarioComponent;
  let fixture: ComponentFixture<PantallaInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaInventarioComponent]
    });
    fixture = TestBed.createComponent(PantallaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
