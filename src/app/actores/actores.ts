export interface ActorDTO {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  foto?: string;
}

export interface ActoresCreacionDto {
  nombre: string;
  fechaNacimiento: Date
  foto?: File
}

export interface ActorAutocompleteDTO {
  id: number;
  nombre: string;
  personaje: string;
  foto: string;
}