import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActorDTO, ActoresCreacionDto } from '../actores';
import moment from 'moment';

@Component({
  selector: 'app-formulario-actores',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './formulario-actores.component.html',
  styleUrl: './formulario-actores.component.css'
})
export class FormularioActoresComponent implements OnInit{
  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }
  private formBuilder = inject(FormBuilder)
  @Output()
  posteoFormulario = new EventEmitter<ActoresCreacionDto>();

  @Input()
  modelo?: ActorDTO;

  form = this.formBuilder.group({
    nombre: ['', {
      validators: [Validators.required]
    }],
    fechaNacimiento: new FormControl<Date | null>(null)
  })

  guardarCambios() {
    if (!this.form.valid) {
      return;
    }
    const actor = this.form.value as ActoresCreacionDto;
    actor.fechaNacimiento = moment(actor.fechaNacimiento).toDate();
    this.posteoFormulario.emit(actor);
  }
}
