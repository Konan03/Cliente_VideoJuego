import {Component, OnInit} from '@angular/core';
import {ServicioVideoJuegoService} from "../../service/servicio-video-juego.service";
import { VideojuegoModel } from '../../model/videojuego.model';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit{

  listVideojuegos: VideojuegoModel [] = [];

  constructor(private servicioVideoJuegoService: ServicioVideoJuegoService) {}

  ngOnInit(): void {
    this.listar();

  }

  listar(){
    this.servicioVideoJuegoService.leerJuegos().subscribe((data:any) => {
      if(data){
        this.listVideojuegos = data;
      }
    })
  }
}
