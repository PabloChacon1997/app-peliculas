import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListadoComponent } from './peliculas/listado/listado.component';
import { MenuComponent } from "./compartidos/componentes/menu/menu.component";
import { RatingComponent } from "./compartidos/componentes/rating/rating.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListadoComponent, MenuComponent, RatingComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

}
