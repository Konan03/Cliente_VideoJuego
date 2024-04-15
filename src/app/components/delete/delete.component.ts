import {Component, Output} from '@angular/core';
import {VideojuegoModel} from "../../model/videojuego.model";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Output()juegoParaEditar: VideojuegoModel | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onJuegoEncontrado(juego: VideojuegoModel | null): void {
    this.juegoParaEditar = juego;  // Guardar el juego encontrado para pasarlo al formulario
  }

}
