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
import { FiltroPeliculasComponent } from './peliculas/filtro-peliculas/filtro-peliculas.component';
import { DetallePeliculaComponent } from './peliculas/detalle-pelicula/detalle-pelicula.component';
import { asAdminGuard } from './compartidos/guards/as-admin.guard';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistroComponent } from './seguridad/registro/registro.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  // Generos
  { path: 'generos', component: IndiceGenerosComponent, canActivate: [asAdminGuard] },
  { path: 'generos/crear', component: GenerosCrearComponent, canActivate: [asAdminGuard] },
  { path: 'generos/editar/:id', component: EditarGeneroComponent, canActivate: [asAdminGuard] },
  // Actores
  { path: 'actores', component: IndiceActoresComponent, canActivate: [asAdminGuard] },
  { path: 'actores/crear', component: CrearActorComponent, canActivate: [asAdminGuard] },
  { path: 'actores/editar/:id', component: EditarActorComponent, canActivate: [asAdminGuard] },
  // Cines
  { path: 'cines', component: IndiceCinesComponent, canActivate: [asAdminGuard] },
  { path: 'cines/crear', component: CrearCineComponent, canActivate: [asAdminGuard] },
  { path: 'cines/editar/:id', component: EditarCineComponent, canActivate: [asAdminGuard] },
  // Peliculas
  { path: 'peliculas/crear', component: CrearPeliculaComponent, canActivate: [asAdminGuard] },
  { path: 'peliculas/editar/:id', component: EditarPeliculaComponent, canActivate: [asAdminGuard] },
  { path: 'peliculas/filtrar', component: FiltroPeliculasComponent },
  { path: 'peliculas/:id', component: DetallePeliculaComponent },
  // Login
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistroComponent },
  // No encontrado
  { path: '**', redirectTo: '' }
];
