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
  mostrarAlerta: boolean = false;
  mostrarAlertaNo: boolean = false;
  constructor(private servicioJuego: ServicioVideoJuegoService) {}

  buscar(busqueda: string) {

    if (busqueda.trim()) { // Asegúrate de que la cadena de búsqueda no esté vacía
      console.log('Iniciando búsqueda con:', busqueda);
      this.servicioJuego.buscarJuegoUnico(busqueda).subscribe({
        next: (juego) => {
          // Emitir el juego encontrado o null si no se encuentra nada
          console.log('Juego encontrado:', juego);
          this.juegoEncontrado.emit(juego);
        },
        error: (error) => {
          console.error('Error al buscar el juego', error);
          this.juegoEncontrado.emit(null);
          this.mostrarAlertaNo = true;
        setTimeout(() => {
            this.mostrarAlertaNo = false;
        }, 5000);
        return;
        }
      });
    } else {
      console.log('No se ingresó término de búsqueda');
      this.juegoEncontrado.emit(null); // Puedes emitir null o no hacer nada si prefieres
      this.mostrarAlerta = true;
        setTimeout(() => {
            this.mostrarAlerta = false;
        }, 5000);
        return;
    }
  }
}
