import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioVideoJuegoService } from '../../service/servicio-video-juego.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  idExists: boolean = false;
  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
  existentIds: number[] = [];
  formVideojuego: FormGroup = new FormGroup({});

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
    this.service.leerJuegos().subscribe(juegos => {
      this.existentIds = juegos.map(juego => juego.id);
    });
  }

  crearVideojuego() {
    if (this.formVideojuego.valid) {
      const id = this.formVideojuego.get('id')?.value;
      if (this.existentIds == id) {
        this.mostrarAlertaID = true;
        return;
      }
      this.service.agregarJuegos(this.formVideojuego.value).subscribe(resp => {
        if (resp) {
          this.formVideojuego.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);
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
}
