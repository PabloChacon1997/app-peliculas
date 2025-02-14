import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListadoComponent } from "../listado/listado.component";
import { FiltroPeliculas } from './filtroPelicula';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GeneroDTO } from '../../generos/generos';
import { PeliculaDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';
import { GenerosService } from '../../generos/generos.service';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filtro-peliculas',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, ListadoComponent, MatPaginatorModule],
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.css'
})
export class FiltroPeliculasComponent implements OnInit{
  generosService = inject(GenerosService);
  peliculasService = inject(PeliculasService);

  paginacion: PaginacionDTO = { pagina: 1, recordPorPagina: 10 }
  cantidadTotalRegistros!:number;

  ngOnInit(): void {
    this.generosService.obtenerTodos()
    .pipe(
      debounceTime(300)
    )
    .subscribe(generos => {
      this.generos = generos;
      this.leerValoresURL();
      this.buscarPeliculas(this.form.value as FiltroPeliculas)
      this.form.valueChanges.subscribe(valores => {
        this.buscarPeliculas(valores as FiltroPeliculas)
        this.escribirParametrosBusquedaEnUrl(valores as FiltroPeliculas)
      })
    })
  }

  buscarPeliculas(valores: FiltroPeliculas) {
    valores.pagina = this.paginacion.pagina;
    valores.recordsPorPagina = this.paginacion.recordPorPagina;

    this.peliculasService.filtrar(valores).subscribe(respuesta => {
      this.peliculas = respuesta.body as PeliculaDTO[];
      const cabecera = respuesta.headers.get('cantidad-total-registros') as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    })
  }

  private formBuilder = inject(FormBuilder);
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute)

  form = this.formBuilder.group({
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  })

  leerValoresURL() {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      var objecto:any = {};
      if (params.titulo) {
        objecto.titulo = params.titulo;
      }
      if (params.generoId) {
        objecto.generoId = Number(params.generoId);
      }
      if (params.proximosEstrenos) {
        objecto.proximosEstrenos = params.proximosEstrenos;
      }
      if (params.enCines) {
        objecto.enCines = params.enCines;
      }

      this.form.patchValue(objecto)
    })
  }

  limpiar() {
    this.form.patchValue({
      titulo: '',
      generoId: 0,
      proximosEstrenos: false,
      enCines: false
    })
  }

  escribirParametrosBusquedaEnUrl(valores: FiltroPeliculas) {
    let queryStrings = [];
    if (valores.titulo) {
      queryStrings.push(`titulo=${encodeURIComponent(valores.titulo)}`)
    }
    if (valores.generoId!==0) {
      queryStrings.push(`generoId=${valores.generoId}`)
    }
    if (valores.proximosEstrenos) {
      queryStrings.push(`proximosEstrenos=${valores.proximosEstrenos}`)
    }
    if (valores.enCines) {
      queryStrings.push(`enCines=${valores.enCines}`)
    }
    this.location.replaceState('peliculas/filtrar', queryStrings.join('&'));
  }

  generos!: GeneroDTO[];
  peliculas!: PeliculaDTO[];

  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = { pagina: datos.pageIndex +1, recordPorPagina: datos.pageSize }
    this.buscarPeliculas(this.form.value as FiltroPeliculas);
  }
}
