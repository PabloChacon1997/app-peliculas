import { Component, inject } from '@angular/core';
import { FormularioActoresComponent } from "../../actores/formulario-actores/formulario-actores.component";
import { ActoresService } from '../../actores/actores.service';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";

@Component({
  selector: 'app-crear-actor',
  standalone: true,
  imports: [ CrearEntidadComponent],
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.css',
  providers: [
    {provide: SERVICIO_CRUD_TOKEN, useClass: ActoresService}
  ]
})
export class CrearActorComponent {
  formularioActores = FormularioActoresComponent;
}
