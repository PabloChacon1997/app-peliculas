import { Component, inject, OnInit } from '@angular/core';
import { ListadoComponent } from "../peliculas/listado/listado.component";
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ListadoComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent{
  peliculasService = inject(PeliculasService);

  constructor() {
    this.cargarPeliculas()
  }

  peliculaEliminada() {
    this.cargarPeliculas()
  }

  cargarPeliculas() {
    this.peliculasService.obtenerLandingPage().subscribe(modelo => {
      this.peliculasEnCine = modelo.enCines;
      this.peliculasProximosEsternos = modelo.proximosEstrenos;
    })
  }

  peliculasEnCine!: any[]
  peliculasProximosEsternos!: any[]

  clickBoton() {
    alert("Me has clickeado")
  }
}
