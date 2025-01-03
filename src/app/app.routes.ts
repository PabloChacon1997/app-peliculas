import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IndiceGenerosComponent } from './generos/indice-generos/indice-generos.component';
import { GenerosCrearComponent } from './generos/generos-crear/generos-crear.component';
import { IndiceActoresComponent } from './generos/indice-actores/indice-actores.component';
import { CrearActorComponent } from './generos/crear-actor/crear-actor.component';
import { IndiceCinesComponent } from './cines/indice-cines/indice-cines.component';
import { CrearCineComponent } from './cines/crear-cine/crear-cine.component';
import { CrearPeliculaComponent } from './peliculas/crear-pelicula/crear-pelicula.component';
import { EditarGeneroComponent } from './generos/editar-genero/editar-genero.component';
import { EditarActorComponent } from './actores/editar-actor/editar-actor.component';
import { EditarCineComponent } from './cines/editar-cine/editar-cine.component';
import { EditarPeliculaComponent } from './peliculas/editar-pelicula/editar-pelicula.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  // Generos
  { path: 'generos', component: IndiceGenerosComponent },
  { path: 'generos/crear', component: GenerosCrearComponent },
  { path: 'generos/editar/:id', component: EditarGeneroComponent },
  // Actores
  { path: 'actores', component: IndiceActoresComponent },
  { path: 'actores/crear', component: CrearActorComponent },
  { path: 'actores/editar/:id', component: EditarActorComponent },
  // Cines
  { path: 'cines', component: IndiceCinesComponent },
  { path: 'cines/crear', component: CrearCineComponent },
  { path: 'cines/editar/:id', component: EditarCineComponent },
  // Peliculas
  { path: 'peliculas/crear', component: CrearPeliculaComponent },
  { path: 'peliculas/editar/:id', component: EditarPeliculaComponent },
  // No encontrado
  { path: '**', redirectTo: '' }
];
