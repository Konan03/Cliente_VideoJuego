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
  filtroMultijugador: string = 'todos';

  constructor(private servicioVideoJuegoService: ServicioVideoJuegoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.servicioVideoJuegoService.leerJuegos().subscribe((data:any) => {
      if(data){
        if (this.filtroMultijugador !== 'todos') {
          this.listVideojuegos = data.filter((item:any) => {
            if (this.filtroMultijugador === 'true') {
              return item.multijugador === true;
            } else {
              return item.multijugador === false;
            }
          });
        } else {
          this.listVideojuegos = data;
        }
      }
    });
  }

  onChangeFiltroMultijugador() {
    this.listar();
  }
}
