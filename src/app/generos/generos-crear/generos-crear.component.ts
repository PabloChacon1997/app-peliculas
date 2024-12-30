import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroCreacionDTO } from '../generos';

@Component({
  selector: 'app-generos-crear',
  standalone: true,
  imports: [FormularioGeneroComponent],
  templateUrl: './generos-crear.component.html',
  styleUrl: './generos-crear.component.css'
})
export class GenerosCrearComponent {
  router = inject(Router);
  
  guardarCambios(genero: GeneroCreacionDTO) {
    // ---guardar cambios
    // this.router.navigate(['generos']);
    console.log('creando el género: ', genero)
  }
}
