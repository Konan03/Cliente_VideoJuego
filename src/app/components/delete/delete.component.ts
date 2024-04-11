import { Component } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  mostrarAlerta = false;

  buscarClick(): void{
    this.mostrarAlerta = true;
  }

}
