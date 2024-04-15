import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicioVideoJuegoService } from '../../service/servicio-video-juego.service';
import {VideojuegoModel} from "../../model/videojuego.model";
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    mostrarAlerta: boolean = false;
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
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videojuegoParaEditar'] && this.videojuegoParaEditar) {
      this.isUpdate = true; // Cambia al modo de actualización si hay un juego para editar
      this.formVideojuego.patchValue({
        id: this.videojuegoParaEditar.id,
        nombre: this.videojuegoParaEditar.nombre,
        precio: this.videojuegoParaEditar.precio,
        fechaLanzamiento: this.videojuegoParaEditar.fechaLanzamiento,
        // Transforma el valor booleano a string para los botones de radio
        multijugador: this.videojuegoParaEditar.multijugador ? 'true' : 'false'
      });
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
                    this.mostrarAlerta = true;
                    setTimeout(() => {
                      this.mostrarAlerta = false;
                  }, 5000);
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
          console.log('Juego actualizado', resp);
        },
        error: (e) => {
          // Manejo del error
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
}
