import { CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PeliculasService } from '../peliculas.service';


@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [DatePipe, NgOptimizedImage, CurrencyPipe, ListadoGenericoComponent, MatButtonModule, MatIconModule, RouterLink, SweetAlert2Module],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit{
  ngOnInit(): void {
    
  }

  @Input({required: true})
  peliculas!: any[]

  peliculasService = inject(PeliculasService);

  @Output()
  eliminar = new EventEmitter<void>();

  eliminarId(id: number) {
    this.peliculasService.borrar(id).subscribe(() => this.eliminar.emit())
  }
}
