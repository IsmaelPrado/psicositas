import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { Registro } from 'src/app/models/registro.model';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  constructor(public registroService: RegistroService,
              private formBuilder: FormBuilder) {
                // Inicializa el formulario con validadores
                this.registroForm = this.formBuilder.group({
                  nombre: ['', Validators.required],
                  ape_paterno: ['', Validators.required],
                  ape_materno: ['', Validators.required],
                  // ... Otros campos y validadores
                  chkPolitica: [false, Validators.requiredTrue]
                });
  }

  

  getRegistros(){
    this.registroService.getRegistros().subscribe(
      res => {
        this.registroService.registros= res;
        console.log(res);
      },
      err => console.log(err)
    )
  }

  createRegistro(form: NgForm) {
  
    alert('Creando Registro');
    this.registroService.createRegistro(form.value).subscribe(
      res => {
        this.getRegistros();
        form.reset();
      },
      err => console.log(err)
    );
  }

  deleteRegistro(id: number) {
    //alert('Borrando');
    const resp= confirm('Estas seguro de eliminarlo?');
    console.log('eliminando '+id);
    if(resp){
      this.registroService.deleteRegistro(id).subscribe(
       (res)=>{
         this.getRegistros();
         console.table(res);
       },
       (err)=> console.log(err)
      );
    }
  }

  editCita(registro: Registro) {
    this.registroService.registro = registro;
  }


  formReset(form:NgForm){
    this.registroService.registro=form.value;
    form.reset();
  }
}
