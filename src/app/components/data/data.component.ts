import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;

  usuario: Object = {
    nombreCompleto:{
      nombre: "Carlos",
      apellido: "Mur"
    },
    correo: "cmurestudillos@gmail.com",
    pasatiempos: ["Comer", "Dormir"]
  }

  constructor() {
    // Vemos el objeto "usuario" creado
    console.log(this.usuario);

    this.forma = new FormGroup({
      //Objeto usuario
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3) ]),
        'apellido': new FormControl('', [Validators.required, this.noApellido])
      }),
      'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'pasatiempos': new FormArray([
        new FormControl('Comer', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    // Damos valor alos campos del formulario
    // this.forma.setValue(this.usuario);

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);

        //Imprimimos el valor de los campos modificados en el formulario
        // this.forma.valueChanges
        // .subscribe( data => {
        //   console.log(data);
        // })

    //Imprimimos el valor del campo "username"  cada vez que cambei o sea modificado
    this.forma.controls['username'].valueChanges
        .subscribe( data => {
          console.log(data);
        })

    //Imprimimos el estado del campo "username" a medida que lo modificamos
    this.forma.controls['username'].statusChanges
    .subscribe( data => {
      console.log(data);
    })

  }

  ngOnInit() {
  }

  guardarCambios(){
    console.log(this.forma.value);

    // Dejamos el formulario en blanco (inicializado)
    // this.forma.reset({
    //   nombreCompleto:{
    //     nombre: "",
    //     apellido: ""
    //   },
    //   correo: ""
    // });
  }

  // Validacion para que el apellido no "exista"...
  noApellido( control: FormControl): any{
    if(control.value === 'mur'){
      return {
        noApellido:true
      }
    }
    return null;
  }

  // Validacion para validar password
  noIgual( control: FormControl): any{

    let forma:any = this;

    if(control.value !== forma.controls['password1'].value){
      return {
        noIgual:true
      }
    }
    return null;
  }

  existeUsuario(control:FormControl):Promise<any>|Observable<any>{
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout(()=>{
          if(control.value === "cmur"){
            resolve({existe:true});
          }else{
            resolve(null);
          }
        }, 3000)
      })
      return promesa;
  }

  agregarPasatiempos(){
    (<FormArray>this.forma.controls['pasatiempos']).push(new FormControl('', Validators.required));
  }

}
