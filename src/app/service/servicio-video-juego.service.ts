import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";
import { VideojuegoModel } from '../model/videojuego.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioVideoJuegoService {

  constructor(private http: HttpClient) { }

  leerJuegos(): Observable<VideojuegoModel[]> {
    return this.http.get<VideojuegoModel[]>('http://localhost:8080/videojuego/listar');
  }

  agregarJuegos(request: any): Observable<VideojuegoModel[]>{
    return this.http.post<VideojuegoModel[]>('http://localhost:8080/videojuego', request)
      .pipe(map((data) => data));
  }

  buscarJuego(busqueda: string): Observable<VideojuegoModel> {
    var params: any = { query: busqueda };
    console.log('Parámetros de búsqueda:', params);
    // Comprobar si el valor es numérico
    if (!isNaN(Number(busqueda))) {
      // Si contiene un punto, asumimos que es un precio
      if (busqueda.includes('.')) {
        params = { precio: busqueda };
      } else { // De lo contrario, es un ID
        params = { id: busqueda };
      }
    } else { // Es un nombre
      params = { nombre: busqueda };
    }
    return this.http.get<VideojuegoModel>('http://localhost:8080/videojuego/buscar', { params });
  }

  actualizarJuego(id: number, videojuego: VideojuegoModel): Observable<VideojuegoModel> {
    return this.http.put<VideojuegoModel>(`http://localhost:8080/videojuego/${id}`, videojuego);
  }
}
