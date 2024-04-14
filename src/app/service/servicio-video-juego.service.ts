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
    const params: any = { query: busqueda };
    console.log('Parámetros de búsqueda:', params);
    return this.http.get<VideojuegoModel>('http://localhost:8080/videojuego/buscar', { params });
  }

  actualizarJuego(id: number, videojuego: VideojuegoModel): Observable<VideojuegoModel> {
    return this.http.put<VideojuegoModel>(`http://localhost:8080/videojuego/${id}`, videojuego);
  }
}
