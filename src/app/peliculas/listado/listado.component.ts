import { CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'


@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [DatePipe, NgOptimizedImage, CurrencyPipe, ListadoGenericoComponent, MatButtonModule, MatIconModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit{
  ngOnInit(): void {
    
  }

  @Input({required: true})
  peliculas!: any[]
  
  agregarPelicula() {
    this.peliculas.push(
      {
        titulo: 'Incepion',
        fechaLanzamiento: new Date('2015-05-03'),
        precio: 500.99,
      }
    );
  }

  remover(pelicula: any) {
    const indice = this.peliculas.findIndex((peliculaActual: any) => peliculaActual.titulo == pelicula.titulo)
    this.peliculas.splice(indice, 1)
  }
}
