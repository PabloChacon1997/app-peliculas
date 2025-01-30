import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroCreacionDTO } from '../generos';
import { GenerosService } from '../generos.service';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-generos-crear',
  standalone: true,
  imports: [FormularioGeneroComponent, MostrarErroresComponent],
  templateUrl: './generos-crear.component.html',
  styleUrl: './generos-crear.component.css'
})
export class GenerosCrearComponent {
  private router = inject(Router);
  private generosService = inject(GenerosService);
  errores: string[] = []; 
  
  guardarCambios(genero: GeneroCreacionDTO) {
    this.generosService.crear(genero).subscribe({
      next: () => {
        this.router.navigate(['/generos']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  }
}
