import {Component, OnInit, Output} from '@angular/core';
import {VideojuegoModel} from "../../../model/videojuego.model";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioVideoJuegoService } from '../../../service/servicio-video-juego.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
  mostrarAlertaTodo: boolean = false;
  formVideojuego: FormGroup = new FormGroup({});
  existentIds: number[] = [];
  juegoEncontrado: VideojuegoModel | null = null;

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

  actualizarVideojuego() {
    if (this.formVideojuego.valid) {
      const id = this.formVideojuego.get('id')?.value;
      if(this.existentIds == id){
        this.mostrarAlertaID = true;
        setTimeout(() => {
          this.mostrarAlertaID = false;
        }, 5000);
        return;
      }

      for (let index = 0; index < this.existentIds.length; index++) {
        if (this.existentIds[index] == id) {
          this.mostrarAlertaID = true;
          setTimeout(() => {
              this.mostrarAlertaID = false;
          }, 5000);
          return;
        }
      }
      

      this.service.actualizarJuego(id, this.formVideojuego.value).subscribe({
        next: (resp) => {
          console.log('Juego actualizado', resp);
          this.formVideojuego.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);
        },
        error: (e) => {
        }
      });
    } else {
      this.marcarControlesComoTocados();
    }
  }

  private marcarControlesComoTocados() {
    Object.values(this.formVideojuego.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onJuegoEncontrado(juego: VideojuegoModel | null): void {
    this.juegoEncontrado = juego;
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
