import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VideojuegoModel } from '../../model/videojuego.model';
import { ServicioVideoJuegoService } from '../../service/servicio-video-juego.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  juegosEncontrados: VideojuegoModel[] = [];
  searchForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    precio: new FormControl('')
  });

  @Output() juegosEncontradosEvent = new EventEmitter<VideojuegoModel[]>();

  constructor(private servicioJuego: ServicioVideoJuegoService) {}

  ngOnInit(): void {}

  buscarVideojuego() {
    const id = this.searchForm.get('id')?.value;
    const nombre = this.searchForm.get('nombre')?.value;
    const precio = this.searchForm.get('precio')?.value;
    const busqueda = id || nombre || precio; // Asegurar que al menos uno está lleno

    if (busqueda) {
      this.servicioJuego.buscarJuego(busqueda).subscribe({
        next: (juego: VideojuegoModel) => {
          this.juegosEncontrados = [juego]; // Asumiendo que retorna un solo juego
          this.juegosEncontradosEvent.emit(this.juegosEncontrados);
        },
        error: (error: any) => {
          console.error('Error al buscar juegos', error);
          this.juegosEncontradosEvent.emit([]);
        }
      });
    } else {
      console.log('Por favor ingrese al menos un criterio de búsqueda.');
      this.juegosEncontradosEvent.emit([]);
    }
  }
}