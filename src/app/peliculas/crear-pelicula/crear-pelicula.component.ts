import { Component } from '@angular/core';
import { PeliculaCreacionDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectroMultipleModelo';

@Component({
  selector: 'app-crear-pelicula',
  standalone: true,
  imports: [FormularioPeliculasComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css'
})
export class CrearPeliculaComponent {
  generosSeleccionados: SelectorMultipleDTO[] = [];
  generosNoSeleccionados: SelectorMultipleDTO[] = [
    { llave: 1, valor: 'Drama' },
    { llave: 2, valor: 'Accion' },
    { llave: 3, valor: 'Comedia' },
  ];
  cinesSeleccionados: SelectorMultipleDTO[] = [];
  cinesNoSeleccionados: SelectorMultipleDTO[] = [
    { llave: 1, valor: 'Multicines' },
    { llave: 2, valor: 'Acropolies' },
    { llave: 3, valor: 'Milenium Plaza' },
  ];
  guardarCambios(pelicula:PeliculaCreacionDTO) {
    console.log('creadno pelicula', pelicula);
  }
}
