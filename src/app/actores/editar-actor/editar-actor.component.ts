import { Component, Input, numberAttribute } from '@angular/core';
import { ActorDTO, ActoresCreacionDto } from '../actores';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";

@Component({
  selector: 'app-editar-actor',
  standalone: true,
  imports: [FormularioActoresComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css'
})
export class EditarActorComponent {
  @Input({ transform: numberAttribute })
  id!:number;

  actor: ActorDTO = {id: 1, nombre: 'Tom Holland', fechaNacimiento: new Date(1990, 0, 25), foto: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Tom_Holland_at_KCA_2022.jpg'}
  guardarCambios(actor: ActoresCreacionDto) {
    console.log('editando el actor: ', actor)
  }
}
