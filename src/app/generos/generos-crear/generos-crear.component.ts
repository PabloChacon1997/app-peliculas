import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generos-crear',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './generos-crear.component.html',
  styleUrl: './generos-crear.component.css'
})
export class GenerosCrearComponent {
  router = inject(Router);
  guardarCambios() {
    // ---guardar cambios
    this.router.navigate(['generos']);
  }
}
