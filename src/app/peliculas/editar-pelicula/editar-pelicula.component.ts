import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectroMultipleModelo';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent {
  @Input({ transform: numberAttribute })
  id!:number;

  pelicula: PeliculaDTO = { 
    id: 1, 
    titulo: 'Spider-Man', 
    trailer: 'ABC', 
    fechaLanzamiento: new Date('2018-07-25'), 
    poster: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832'
  }

  generosSeleccionados: SelectorMultipleDTO[] = [
    { llave: 2, valor: 'Accion' }
  ];
  generosNoSeleccionados: SelectorMultipleDTO[] = [
    { llave: 1, valor: 'Drama' },
    { llave: 3, valor: 'Comedia' },
  ];

  cinesSeleccionados: SelectorMultipleDTO[] = [
    { llave: 1, valor: 'Multicines' }
  ];
  cinesNoSeleccionados: SelectorMultipleDTO[] = [
    { llave: 2, valor: 'Acropolies' },
    { llave: 3, valor: 'Milenium Plaza' },
  ];

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    console.log('editando pelicula', pelicula)
  }
}
