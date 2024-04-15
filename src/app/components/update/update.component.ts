import {Component, OnInit, Output} from '@angular/core';
import {VideojuegoModel} from "../../model/videojuego.model";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Output()juegoParaEditar: VideojuegoModel | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onJuegoEncontrado(juego: VideojuegoModel | null): void {
    this.juegoParaEditar = juego;  // Guardar el juego encontrado para pasarlo al formulario
  }
}
