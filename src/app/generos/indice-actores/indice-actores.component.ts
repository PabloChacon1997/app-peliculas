import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ActoresService } from '../../actores/actores.service';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { HttpResponse } from '@angular/common/http';
import { ActorDTO } from '../../actores/actores';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-indice-actores',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, ListadoGenericoComponent,MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.css'
})
export class IndiceActoresComponent {
  actoresService = inject(ActoresService);
  paginacion: PaginacionDTO = { pagina: 1, recordPorPagina: 5 };
  cantidadTotalRegistros !: number;
  actores!: ActorDTO[];
  columnasAmostrar= ['id', 'nombre', 'acciones'];
  constructor() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.actoresService.obtenerPaginado(this.paginacion).subscribe((respuesta: HttpResponse<ActorDTO[]>) => {
      this.actores = respuesta.body as ActorDTO[];
      const cabecera = respuesta.headers.get('cantidad-total-registros') as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    })
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = {pagina: datos.pageIndex+1, recordPorPagina: datos.pageSize};
    this.cargarRegistros();
  }

  eliminar(id: number) {

  }
}
