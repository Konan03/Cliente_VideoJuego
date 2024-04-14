import { Component, EventEmitter, Output } from '@angular/core';
import {ServicioVideoJuegoService} from "../../../service/servicio-video-juego.service";
import { VideojuegoModel } from '../../../model/videojuego.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() juegoEncontrado = new EventEmitter<VideojuegoModel | null>();

  constructor(private servicioJuego: ServicioVideoJuegoService) {}

  buscar(busqueda: string) {

    console.log('Iniciando búsqueda con:', busqueda);
    this.servicioJuego.buscarJuego(busqueda).subscribe({
      next: (juego) => {
        // Emitir el juego encontrado o null si no se encuentra nada
        console.log('Juego encontrado:', juego);
        this.juegoEncontrado.emit(juego);
      },
      error: (error) => {
        console.error('Error al buscar el juego', error);
        this.juegoEncontrado.emit(null);
      }
    });
  }
}
