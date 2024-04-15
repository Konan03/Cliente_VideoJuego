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
    idExists: boolean = false;
    mostrarAlerta: boolean = false;
    existentIds: number[] = [];
    formVideojuego: FormGroup = new FormGroup({});

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

  private marcarControlesComoTocados() {
    Object.values(this.formVideojuego.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
