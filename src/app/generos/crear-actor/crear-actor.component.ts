import { Component } from '@angular/core';
import { FormularioActoresComponent } from "../../actores/formulario-actores/formulario-actores.component";
import { ActoresCreacionDto } from '../../actores/actores';

@Component({
  selector: 'app-crear-actor',
  standalone: true,
  imports: [FormularioActoresComponent],
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.css'
})
export class CrearActorComponent {
  guardarCmabios(actor: ActoresCreacionDto) {
    console.log('creando actor: ' ,actor)
  }
}
