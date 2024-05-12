import {Component, OnInit} from '@angular/core';
import {ServicioVideoJuegoService} from "../../../service/servicio-video-juego.service";
import { VideojuegoModel } from '../../../model/videojuego.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit{
  listVideojuegos: VideojuegoModel [] = [];
  filtroMultijugador: string = 'todos';
  id: number = 0;
  searchForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    estatura: new FormControl(''),
    esPremium: new FormControl('')
  });
  constructor(private servicio: ServicioVideoJuegoService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.listar(this.id);
    })
  }

  listar(id: number){
    this.servicio.leerJuegos(id).subscribe((data:any) => {
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
      this.listar(this.id);
  }

  buscarVideojuego(){}
}
