import { inject, Injectable } from '@angular/core';
import { GeneroCreacionDTO, GeneroDTO } from './generos';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/contruirQueryParams';
import { ActorDTO } from '../actores/actores';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiUrl+'/generos';

  public obtenerPorPagina(paginacion: PaginacionDTO): Observable<HttpResponse<GeneroDTO[]>> {
    let queryParams = construirQueryParams(paginacion)
    return this.http.get<GeneroDTO[]>(this.urlBase, { params: queryParams, observe: 'response' });
  }

  public obtenerPorId(id: number): Observable<GeneroDTO> {
    return this.http.get<GeneroDTO>(`${this.urlBase}/${id}`);
  }

  public actualizar(id: number, genero: GeneroCreacionDTO) {
    return this.http.put(`${this.urlBase}/${id}`, genero);
  }

  public crear(genero: GeneroCreacionDTO) {
    return this.http.post(this.urlBase, genero);
  }
  public eliminar(id: number) {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
