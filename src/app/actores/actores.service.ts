import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActorDTO, ActoresCreacionDto } from './actores';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/funciones/contruirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiUrl + '/actores';

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<ActorDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }

  public crear(actor: ActoresCreacionDto) {
    const formData = this.construirFomrData(actor);
    return this.http.post(this.urlBase, formData);
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
