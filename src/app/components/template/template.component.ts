import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: "",
    apellido: "",
    correo: "",
    pais:"",
    sexo: "Hombre",
    acepta: false
  }

  paises = [{
    codigo: "ESP",
    nombre: "España"
  },
  {
    codigo: "POR",
    nombre: "Portugal"
  },
  {
    codigo: "FRA",
    nombre: "Francia"
  }
]

sexos: string[] = ["Hombre", "Mujer", "Sin Definir"];


  constructor() { }

  ngOnInit() {
  }

  guardar(forma:NgForm){
    console.log("ngForm", forma);
    console.log("Valor formulario", forma.value);
    console.log("usuario", this.usuario);
  }

}
