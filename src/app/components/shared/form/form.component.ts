import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent {

    codigo: string = '';
    nombre: string = '';
    birthdate: string = '';
    multijugador: string = '';

    constructor() { }

    submitForm(form: NgForm) {
        if (form.valid) {
            
            console.log('Formulario enviado correctamente');
        }
    }

}
