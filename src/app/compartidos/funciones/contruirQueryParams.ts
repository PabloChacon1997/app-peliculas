import { HttpParams } from "@angular/common/http";

export function construirQueryParams(obj: any): HttpParams {
  let queryParams = new HttpParams();
  for (const propiedad in obj) {
    if (obj.hasOwnProperty(propiedad)) {
      queryParams = queryParams.append(propiedad, obj[propiedad]);
    }
  }
  return queryParams;
}