import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActorAutocompleteDTO } from '../actores';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-autocomplete-actores',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatIconModule, FormsModule, MatTableModule, MatInputModule, MatAutocompleteModule, DragDropModule],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.css'
})
export class AutocompleteActoresComponent implements OnInit {
  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      if (typeof valor === 'string' && valor) {
        this.actoresService.obtenerPorNombre(valor).subscribe(actores => {
          this.actores = actores;
        });
      }
    })
  }
  control = new FormControl();
  actores: ActorAutocompleteDTO[] = [];

  @Input({required: true})
  actoresSeleccionados: ActorAutocompleteDTO[] = [];

  actoresService = inject(ActoresService);

  columnosAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table!: MatTable<ActorAutocompleteDTO>;

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    const actor = event.option.value as ActorAutocompleteDTO
    const indice = this.actoresSeleccionados.findIndex((a: ActorAutocompleteDTO) => a.id === actor.id);
    if (indice !== -1) {
      return;
    }
    this.actoresSeleccionados.push(event.option.value)
    this.control.patchValue('');
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  finalizarArrastre(event: CdkDragDrop<any[]>) {
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

  eliminar(actor: ActorAutocompleteDTO) {
    const indice = this.actoresSeleccionados.findIndex((a: ActorAutocompleteDTO) => a.id === actor.id);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }
}
