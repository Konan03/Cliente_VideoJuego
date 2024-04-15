import {Component, OnInit, Output} from '@angular/core';
import {VideojuegoModel} from "../../model/videojuego.model";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioVideoJuegoService } from '../../service/servicio-video-juego.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  mostrarAlerta: boolean = false;
  formVideojuego: FormGroup = new FormGroup({});
  juegoEncontrado: VideojuegoModel | null = null;

  constructor(private service: ServicioVideoJuegoService) { }

  ngOnInit(): void {
    this.formVideojuego = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      multijugador: new FormControl('', [Validators.required]),
      fechaLanzamiento: new FormControl('', [Validators.required])
    });
  }

  actualizarVideojuego() {
    if (this.formVideojuego.valid) {
      const id = this.formVideojuego.get('id')?.value;
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
          console.error('Error al actualizar el juego', e);
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
