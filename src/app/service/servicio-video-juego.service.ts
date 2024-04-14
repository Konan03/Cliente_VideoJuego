import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicioVideoJuegoService {
  private baseUrl = 'http://localhost:8080/videojuego';
  constructor(private http: HttpClient) { }

  obtenerJuegos(): Observable<any> {
    // Retorna un Observable que puedes suscribir en el componente
    return this.http.get(this.baseUrl);
  }
}
