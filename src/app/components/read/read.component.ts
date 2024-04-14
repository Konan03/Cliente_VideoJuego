import {Component, OnInit} from '@angular/core';
import {ServicioVideoJuegoService} from "../../service/servicio-video-juego.service";

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit{

  public juegos: any;
  constructor(private servicioVideoJuegoService: ServicioVideoJuegoService) {}

  ngOnInit() {
    this.servicioVideoJuegoService.obtenerJuegos().subscribe((data: any) => {
      this.juegos = data;
    }, (error: any) => {
      console.error('Hubo un error al obtener los juegos:', error);
    });
  }
}
