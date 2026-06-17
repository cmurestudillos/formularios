import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

import { DataComponent } from './data.component';

describe('DataComponent', () => {
  let component: DataComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    component = TestBed.createComponent(DataComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('forma should be invalid by default (required fields empty)', () => {
    expect(component.forma.invalid).toBeTrue();
  });

  describe('noApellido', () => {
    it('returns an error when the value is "mur"', () => {
      const result = component.noApellido({ value: 'mur' } as AbstractControl);
      expect(result).toEqual({ noApellido: true });
    });

    it('returns null for any other value', () => {
      const result = component.noApellido({ value: 'gonzalez' } as AbstractControl);
      expect(result).toBeNull();
    });
  });

  describe('noIgual', () => {
    it('returns an error when the value does not match password1', () => {
      const result = component.noIgual({ value: 'distinto' } as AbstractControl);
      expect(result).toEqual({ noIgual: true });
    });

    it('returns null when the value matches password1', () => {
      const password1Value = component.forma.controls['password1'].value;
      const result = component.noIgual({ value: password1Value } as AbstractControl);
      expect(result).toBeNull();
    });
  });

  describe('agregarPasatiempos', () => {
    it('adds a new control to the "pasatiempos" FormArray', () => {
      const pasatiempos = component.forma.controls['pasatiempos'] as FormArray;
      const initialLength = pasatiempos.length;

      component.agregarPasatiempos();

      expect(pasatiempos.length).toBe(initialLength + 1);
    });
  });

  describe('existeUsuario', () => {
    it('resolves { existe: true } when the value is "cmur"', fakeAsync(() => {
      let result: unknown;
      (component.existeUsuario({ value: 'cmur' } as AbstractControl) as Promise<unknown>).then(value => (result = value));

      tick(3000);

      expect(result).toEqual({ existe: true });
    }));

    it('resolves null for any other value', fakeAsync(() => {
      let result: unknown;
      (component.existeUsuario({ value: 'otro' } as AbstractControl) as Promise<unknown>).then(value => (result = value));

      tick(3000);

      expect(result).toBeNull();
    }));
  });
});
