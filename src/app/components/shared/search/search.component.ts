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

    if (busqueda.trim()) {
      console.log('Iniciando búsqueda con:', busqueda);
      this.servicioJuego.buscarJuego(busqueda).subscribe({
        next: (juego) => {
          console.log('Juego encontrado:', juego);
          this.juegoEncontrado.emit(juego);
        },
        error: (error) => {
          console.error('Error al buscar el juego', error);
          this.juegoEncontrado.emit(null);
        }
      });
    } else {
      console.log('No se ingresó término de búsqueda');
      this.juegoEncontrado.emit(null);
    }
  }
}
