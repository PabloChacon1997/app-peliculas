export function extraerErrores(obj: any): string[] {
  const error = obj.error.errors;
  let mensajesError: string[] = [];
  for(let llave in error) {
    let campo = llave;
    const mensajeConCampos = error[llave].map((mensaje: string) => `${campo}: ${mensaje}`);
    mensajesError = mensajesError.concat(mensajeConCampos);
  }
  return mensajesError;
}