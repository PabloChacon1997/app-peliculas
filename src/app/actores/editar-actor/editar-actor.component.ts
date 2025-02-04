import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { ActorDTO, ActoresCreacionDto } from '../actores';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { ActoresService } from '../actores.service';
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";

@Component({
  selector: 'app-editar-actor',
  standalone: true,
  imports: [FormularioActoresComponent, MostrarErroresComponent, CargandoComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css'
})
export class EditarActorComponent implements OnInit{
  ngOnInit(): void {
    this.actoresServices.obtenerPorId(this.id).subscribe( actor => {
      this.actor = actor;
    })
  }
  @Input({ transform: numberAttribute })
  id!:number;

  actor!: ActorDTO;
  actoresServices = inject(ActoresService);
  router = inject(Router);
  errores: string[] = [];

  guardarCambios(actor: ActoresCreacionDto) {
    this.actoresServices.actualizar(this.id, actor).subscribe({
      next: () => {
        this.router.navigate(['/actores']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  }
}
