import {Component, Output} from '@angular/core';
import {VideojuegoModel} from "../../../model/videojuego.model";
import { ServicioVideoJuegoService } from '../../../service/servicio-video-juego.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  mostrarAlertaID: boolean = false
  mostrarAlerta: boolean = false;
  formVideojuego: FormGroup = new FormGroup({});
  existentIds: number[] = [];
  
  constructor(private service: ServicioVideoJuegoService) { }

  ngOnInit(): void {
    this.obtenerIdsExistentes();

    this.formVideojuego = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      multijugador: new FormControl('', [Validators.required]),
      fechaLanzamiento: new FormControl('', [Validators.required])
    });
  }

  obtenerIdsExistentes() {
    /**this.service.leerJuegos().subscribe(juegos => {
      this.existentIds = juegos.map(juego => juego.id);
    });*/
  }

  eliminarVideojuego(id: number) {
    if (confirm('Are you sure you want to delete this video game?')) {
      this.service.eliminarJuego(id).subscribe({
        next: () => {
          console.log('Successfully removed video game');
          this.formVideojuego.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);

        },
        error: (error) => {
          console.error('There was an error deleting the game', error);
        }
      });
    }
  }

  onJuegoEncontrado(juego: VideojuegoModel | null): void {
    if (juego) {
      this.formVideojuego.patchValue({
        id: juego.id,
        nombre: juego.nombre,
        precio: juego.precio,
        multijugador: juego.multijugador.toString(),
        fechaLanzamiento: juego.fechaLanzamiento
      });
    } else {
      this.formVideojuego.reset();
    }
  }
}
