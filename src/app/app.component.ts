import { CarroService } from "./services/carro.service";
import { Carro } from "./models/carro.models";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {

  carro = {} as Carro;
  carros: Carro[];

  constructor(private carroService: CarroService) {}

  ngOnInit(): void {
    this.getCarros();
  }

  // Valida se o carro já existe, se não ele cria um novo carro
  salvaCarro(form: NgForm) {
    if (this.carro.id !== undefined) {
      this.carroService.updateCarro(this.carro).subscribe(() => {
        this.limpaForm(form);
      });
    } else {
      this.carroService.salvaCarro(this.carro).subscribe(() => {
        this.limpaForm(form);
      });
    }
  }

  // Chama o service que retorna todos os carros
  getCarros() {
    this.carroService.getCarros().subscribe((carros: Carro[]) => {
      this.carros = carros;
    });
  }

  // Deleta um carro
  deletaCarro(carro: Carro) {
    this.carroService.deletaCarro(carro).subscribe(() => {
      this.getCarros();
    });
  }

  // Armazena o carro
  tempCarro(carro: Carro) {
    this.carro = { ...carro};
  }

  // Limpa formulario
  limpaForm(form: NgForm) {
    this.getCarros();
    form.resetForm();
    this.carro = {} as Carro;
  }


}
