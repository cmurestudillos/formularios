import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { TemplateComponent } from './template.component';

describe('TemplateComponent', () => {
  let component: TemplateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    component = TestBed.createComponent(TemplateComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize "usuario" with the expected defaults', () => {
    expect(component.usuario).toEqual({
      nombre: '',
      apellido: '',
      correo: '',
      pais: '',
      sexo: 'Hombre',
      acepta: false,
    });
  });

  it('should expose 3 paises', () => {
    expect(component.paises.length).toBe(3);
    expect(component.paises.map(p => p.codigo)).toEqual(['ESP', 'POR', 'FRA']);
  });

  it('should expose 3 sexos', () => {
    expect(component.sexos).toEqual(['Hombre', 'Mujer', 'Sin Definir']);
  });

  it('guardar() should not throw given a form value', () => {
    const fakeForm = { value: component.usuario } as NgForm;
    expect(() => component.guardar(fakeForm)).not.toThrow();
  });
});
