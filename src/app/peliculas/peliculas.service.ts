import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PeliculaCreacionDTO, PeliculaDTO, PeliculasPostGetDTO } from './peliculas';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiUrl+'/peliculas';

  public crearGet(): Observable<PeliculasPostGetDTO> {
    return this.http.get<PeliculasPostGetDTO>(`${this.urlBase}/PostGet`);
  }

  public crear(pelicula: PeliculaCreacionDTO): Observable<PeliculaDTO> {
    const formData = this.construirFormData(pelicula);
    return this.http.post<PeliculaDTO>(this.urlBase, formData);
  }

  private construirFormData(pelicula: PeliculaCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('titulo', pelicula.titulo);
    formData.append('fechaLanzamiento', pelicula.fechaLanzamiento.toISOString().split('T')[0]);

    if (pelicula.poster) {
      formData.append('poster', pelicula.poster);
    }

    if (pelicula.trailer) {
      formData.append('trailer', pelicula.trailer);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  }
}
