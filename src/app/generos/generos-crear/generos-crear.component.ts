import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';

@Component({
  selector: 'app-generos-crear',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormField, ReactiveFormsModule, MatInputModule],
  templateUrl: './generos-crear.component.html',
  styleUrl: './generos-crear.component.css'
})
export class GenerosCrearComponent {
  router = inject(Router);
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
    // ---guardar cambios
    // this.router.navigate(['generos']);
    console.log(this.form.value)
  }
}
