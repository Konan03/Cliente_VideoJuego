import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, map} from "rxjs";
import { VideojuegoModel } from '../model/videojuego.model';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioVideoJuegoService {

  constructor(private http: HttpClient) { }

  //VideoJuegos
  leerJuegos(id: number): Observable<VideojuegoModel[]> {
    return this.http.get<VideojuegoModel[]>(`http://localhost:8080/videojuegos/${id}`);
  }

  agregarJuegos(id:number, request: any): Observable<VideojuegoModel[]>{
    return this.http.post<VideojuegoModel[]>(`http://localhost:8080/videojuegos/${id}`, request)
      .pipe(map((data) => data));
  }

  actualizarJuego(userid:number, id: number, videojuego: VideojuegoModel): Observable<VideojuegoModel> {
    return this.http.put<VideojuegoModel>(`http://localhost:8080/videojuegos/${userid}/${id}`, videojuego);
  }

  eliminarJuego(usuarioId: number, id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/videojuegos/${usuarioId}/${id}`);
  }  

  buscarJuego(busqueda: string): Observable<VideojuegoModel> {
    var params: any = { query: busqueda };
    console.log('Parámetros de búsqueda:', params);
    if (!isNaN(Number(busqueda))) {
      if (busqueda.includes('.')) {
        params = { precio: busqueda };
        params = { id: busqueda };
      }
    } else {
      params = { nombre: busqueda };
    }
    return this.http.get<VideojuegoModel>('http://localhost:8080/videojuego/buscar', { params });
  }

  buscarJuegoUnico(id: number): Observable<VideojuegoModel[]> {
    return this.http.get<VideojuegoModel[]>(`http://localhost:8080/videojuegos/${id}`);
  }

  obtenerJuegosDeUsuario(id: number): Observable<VideojuegoModel[]> {
    return this.http.get<VideojuegoModel[]>(`http://localhost:8080/videojuegos/usuario/${id}`);
  }

  buscarJuegosUsuario(id: number, parametros: any): Observable<VideojuegoModel[]> {
    let params = new HttpParams();
    if (parametros.id) {
      params = params.set('id', parametros.id.toString());
    }
    if (parametros.nombre) {
      params = params.set('nombre', parametros.nombre);
    }
    if (parametros.precio) {
      params = params.set('precio', parametros.precio.toString());
    }
    if (parametros.multijugador !== undefined) {
      params = params.set('multijugador', parametros.multijugador.toString());
    }
    return this.http.get<VideojuegoModel[]>(`http://localhost:8080/videojuegos/usuario/${id}`, { params });
  }
  

  //Usuarios
  leerUsuarios(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('http://localhost:8080/usuarios');
  }

  agregarUsuarios(request: any): Observable<UserModel[]>{
    return this.http.post<UserModel[]>('http://localhost:8080/usuarios', request)
      .pipe(map((data) => data));
  }

  eliminarUsuarios(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/usuarios/${id}`);
  }

  actualizarUsuarios(id: number, usuario: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`http://localhost:8080/usuarios/${id}`, usuario);
  }

  buscarUsuarioUnico(id: string): Observable<UserModel> {
    const params = { id };
    console.log('Buscando usuario por ID:', id);
    
    return this.http.get<UserModel>('http://localhost:8080/usuarios', { params });
  }

  buscarUsuarioParametro(id?: number, nombre?: string, estatura?: number, esPremium?: boolean): Observable<UserModel[]> {
    let params = new HttpParams();
    if (id) {
      params = params.set('id', id.toString());
    }
    if (nombre) {
      params = params.set('nombre', nombre);
    }
    if (estatura !== undefined) {
      params = params.set('estatura', estatura.toString());
    }
    if (esPremium !== undefined) {
      params = params.set('esPremium', esPremium.toString());
    }

    return this.http.get<UserModel[]>('http://localhost:8080/usuarios', { params });
  }

}
