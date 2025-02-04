import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActorDTO, ActoresCreacionDto } from './actores';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/funciones/contruirQueryParams';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';

@Injectable({
  providedIn: 'root'
})
export class ActoresService implements IServicioCRUD<ActorDTO, ActoresCreacionDto>{

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiUrl + '/actores';

  public obtenerPorPagina(paginacion: PaginacionDTO): Observable<HttpResponse<ActorDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }

  public obtenerPorId(id: number): Observable<ActorDTO> {
    return this.http.get<ActorDTO>(`${this.urlBase}/${id}`);
  }

  public actualizar(id: number, actor: ActoresCreacionDto) {
    const formData = this.construirFomrData(actor);
    return this.http.put(`${this.urlBase}/${id}`, formData);
  }

  public crear(actor: ActoresCreacionDto) {
    const formData = this.construirFomrData(actor);
    return this.http.post(this.urlBase, formData);
  }

  public eliminar(id: number) {
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  private construirFomrData(actor: ActoresCreacionDto): FormData {
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    formData.append('fechaNacimiento', actor.fechaNacimiento.toISOString().split('T')[0]);
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }
    return formData;
  }

  

}
