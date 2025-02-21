import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CredencialesUsuarioDTO, RespuestaAutenticacionDTO, UsuarioDTO } from './seguridad';
import { Observable, tap } from 'rxjs';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/contruirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiUrl + '/usuarios';
  private readonly llaveToken = 'token';
  private readonly llaveTokenExpiracion = 'token-expiracion';

  obtenerUsuariosPaginados(paginacion: PaginacionDTO):Observable<HttpResponse<UsuarioDTO[]>> {
    let queryparmas = construirQueryParams(paginacion);
    return this.http.get<UsuarioDTO[]>(`${this.urlBase}/ListadoUsuarios`, { params: queryparmas, observe: 'response' });
  }

  hacerAdmin(email: string) {
    return this.http.post(`${this.urlBase}/HacerAdmin`, {email});
  }
  eliminarAdmin(email: string) {
    return this.http.post(`${this.urlBase}/EliminarAdmin`, {email});
  }

  registrar(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticacionDTO> {
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlBase}/registrar`, credenciales)
    .pipe(
      tap(respuestaAuth => this.guardarToken(respuestaAuth))
    );
  }
  
  login(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticacionDTO> {
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlBase}/login`, credenciales)
    .pipe(
      tap(respuestaAuth => this.guardarToken(respuestaAuth))
    );
  }

  guardarToken(respuestaAutenticacion: RespuestaAutenticacionDTO) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveTokenExpiracion, respuestaAutenticacion.expiracion.toString());
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.llaveToken);
  }

  obtenerCampoToken(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) return '';
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    console.log(dataToken)
    return dataToken[campo];
  }

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return false;
    }

    const expiracion = localStorage.getItem(this.llaveTokenExpiracion)!;
    const expiracionFecha = new Date(expiracion);
    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveTokenExpiracion);
  }

  obtenerRol(): string {
    const esAdmin = this.obtenerCampoToken('esadmin');
    if (esAdmin) {
      return 'admin';
    } else {
      return '';
    }
  }
}
