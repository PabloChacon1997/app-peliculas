import { Component, Input, numberAttribute } from '@angular/core';
import { CineCreacionDTO, CineDTO } from '../cines';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";

@Component({
  selector: 'app-editar-cine',
  standalone: true,
  imports: [FormularioCinesComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css'
})
export class EditarCineComponent {
  @Input({ transform: numberAttribute })
  id!:number;

  cine: CineDTO = {id: 1, nombre: 'Acrópolis', latitud: -2.86948679486026, longitud: -78.96603679001095}
  guardarCambios(cine: CineCreacionDTO) {
    console.log('editar cine', cine);
  }
}
