import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { GeneroDTO } from '../generos';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { MatTableModule } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ListadoGenericoComponent, MatTableModule, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css'
})
export class IndiceGenerosComponent {
  generosService = inject(GenerosService);
  generos!: GeneroDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  pagina: PaginacionDTO = {pagina: 1, recordPorPagina: 5};
  cantidadTotalRegistros!: number;

  constructor() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.generosService.obtenerPorPagina(this.pagina).subscribe((respuesta: HttpResponse<GeneroDTO[]>) => {
      this.generos = respuesta.body as GeneroDTO[];
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.pagina = { pagina: datos.pageIndex +1, recordPorPagina: datos.pageSize }
    this.cargarRegistros();
  }

  eliminar(id: number) {
    this.generosService.eliminar(id).subscribe(() => {
      this.pagina = {pagina: 1, recordPorPagina: 5};
      this.cargarRegistros();
    });
  }
}
