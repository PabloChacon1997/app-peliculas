import { Component, inject, Input } from '@angular/core';
import { PaginacionDTO } from '../../modelos/PaginacionDTO';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListadoGenericoComponent } from "../listado-generico/listado-generico.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';

@Component({
  selector: 'app-indice-entidad',
  standalone: true,
  imports: [ListadoGenericoComponent,RouterLink, MatButtonModule, MatTableModule, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-entidad.component.html',
  styleUrl: './indice-entidad.component.css'
})
export class IndiceEntidadComponent<TDTO, TCreacionDTO> {
  @Input({required: true})
  titulo!: string;
  
  @Input({required: true})
  rutaCrear!: string;
  
  @Input({required: true})
  rutaEditar!: string;
  
  @Input()
  columnasAMostrar = ['id', 'nombre','acciones'];

  constructor() {
    this.cargarRegistros();
  }

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<TDTO, TCreacionDTO>;

  pagina: PaginacionDTO = {pagina: 1, recordPorPagina: 5};
  entidades!: TDTO[];
  cantidadTotalRegistros!: number;

  actualizarPaginacion(datos: PageEvent) {
    this.pagina = { pagina: datos.pageIndex +1, recordPorPagina: datos.pageSize }
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.servicioCRUD.obtenerPorPagina(this.pagina).subscribe((respuesta: HttpResponse<TDTO[]>) => {
      this.entidades = respuesta.body as TDTO[];
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    });
  }

  eliminar(id: number) {
    this.servicioCRUD.eliminar(id).subscribe(() => {
      this.pagina.pagina  =1;
      this.cargarRegistros();
    });
  }

  primeraLetraMayuscula(valor: string) {
    if (!valor) return valor;
    return valor.charAt(0).toUpperCase() + valor.slice(1);
  }
}
