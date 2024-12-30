import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { GeneroCreacionDTO, GeneroDTO } from '../generos';

@Component({
  selector: 'app-formulario-genero',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormField, ReactiveFormsModule, MatInputModule],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css'
})
export class FormularioGeneroComponent implements OnInit{
  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo)
    }
  }

  @Input()
  modelo?: GeneroDTO;

  @Output()
  posteoFormulario = new EventEmitter<GeneroCreacionDTO>();
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    nombre: ['', {validators: [Validators.required, primeraLetraMayuscula()]}]
  })

  obtenerErrorCampoNombre(): string {
    let nombre = this.form.controls.nombre;

    if (nombre.hasError('required')) {
      return "El campo nombre es requrido";
    }

    if (nombre.hasError('primeraLetraMayuscula')) {
      return nombre.getError('primeraLetraMayuscula').mensaje;
    }

    return "";
  }

  guardarCambios() {
    if (!this.form.valid) {
      return;
    }

    const genero = this.form.value as GeneroCreacionDTO;
    this.posteoFormulario.emit(genero)
  }
}
