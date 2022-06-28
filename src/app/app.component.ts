import { CarroService } from './services/carro.service';
import { Carro } from './models/carro.models';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http';

  carro = {} as Carro;
  carros: Carro[];

  constructor(private carroService: CarroService) {}

  ngOnInit(): void {
    this.carroService.getCarros();
  }

  // valida se o carro já existe, se não ele cria um novo carro
  salvaCarro(form: NgForm) {
    if (this.carro.id !== undefined) {
      this.carroService.updateCarro(this.carro).subscribe(() => {
        //this.cleanForm(form);
      });
    } else {
      this.carroService.salvaCarro(this.carro).subscribe(() => {
        //this.cleanForm(form);
      });
    }
  }

    // Chama o service que retorna todos os carros
    getCars() {
      this.carroService.getCarros().subscribe((carros: Carro[]) => {
        this.carros = carros;
      });
    }


}
