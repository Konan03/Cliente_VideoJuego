import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicioVideoJuegoService } from '../../service/servicio-video-juego.service';
import {VideojuegoModel} from "../../model/videojuego.model";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    isUpdate: boolean = false;
    formVideojuego: FormGroup = new FormGroup({});
    @Input() videojuegoParaEditar: VideojuegoModel | null = null;

    constructor(private service: ServicioVideoJuegoService) { }

    ngOnInit(): void {
        this.formVideojuego = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
            nombre: new FormControl('', [Validators.required]),
            precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
            multijugador: new FormControl('', [Validators.required]),
            fechaLanzamiento: new FormControl('', [Validators.required])
        });

      if (this.videojuegoParaEditar) {
        this.isUpdate = true;
        this.formVideojuego.patchValue(this.videojuegoParaEditar);
      }
    }

  onSubmit() {
    if (this.isUpdate) {
      this.actualizarVideojuego();
    } else {
      this.crearVideojuego();
    }
  }

    crearVideojuego() {
        if (this.formVideojuego.valid) {
            this.service.agregarJuegos(this.formVideojuego.value).subscribe(resp => {
                if (resp) {
                    this.formVideojuego.reset();
                }
            });
        } else {
            if (this.formVideojuego.touched) {
                Object.values(this.formVideojuego.controls).forEach(control => {
                    control.markAsTouched();
                });
            }
        }
    }

  actualizarVideojuego() {
    if (this.formVideojuego.valid) {
      const id = this.formVideojuego.get('id')?.value;
      this.service.actualizarJuego(id, this.formVideojuego.value).subscribe({
        next: (resp) => {
          // Manejo de la respuesta
        },
        error: (e) => {
          // Manejo del error
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
