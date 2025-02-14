import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../peliculas';
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { MatChipsModule } from '@angular/material/chips'
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordenada } from '../../compartidos/componentes/mapa/Coordenada';
import { MapaComponent } from "../../compartidos/componentes/mapa/mapa.component";

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CargandoComponent, MatChipsModule, RouterLink, MapaComponent],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent implements OnInit{
  ngOnInit(): void {
    this.peliculasService.obtenerPoId(this.id).subscribe(pelicula => {
      pelicula.fechaLanzamiento = new Date(pelicula.fechaLanzamiento);
      this.pelicula = pelicula;
      this.trailerUrl = this.generarUrlYoutubeEmbed(pelicula.trailer);
      this.coordenadas = pelicula.cines!.map(cine => {
        return <Coordenada>{latitud: cine.latitud, longitud: cine.longitud, texto: cine.nombre};
      })
    })
  }
  @Input({transform: numberAttribute})
  id!: number;

  peliculasService = inject(PeliculasService);
  pelicula!: PeliculaDTO;
  sanitizer = inject(DomSanitizer);
  trailerUrl!: SafeResourceUrl;
  coordenadas: Coordenada[] = [];

  generarUrlYoutubeEmbed(url: string): SafeResourceUrl | string {
    if (!url) {
      return '';
    }

    var videoId = url.split('v=')[1];
    var posicionAmpersant = videoId.indexOf('&');
    if (posicionAmpersant !== -1) {
      videoId = videoId.substring(0, posicionAmpersant);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);

  }
}
