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