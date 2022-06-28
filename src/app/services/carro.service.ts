import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Carro } from '../models/carro.models';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  private url = 'http://localhost:3000/cars'; // api rest fake

  //incluindo o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //retorna todos os carros
  getCarros(): Observable<Carro[]> {
    return this.httpClient.get<Carro[]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

   // retorna um carro pelo id
   getCarroById(id: number): Observable<Carro> {
    return this.httpClient.get<Carro>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // cria um carro
  salvaCarro(car: Carro): Observable<Carro> {
    return this.httpClient.post<Carro>(this.url, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // atualiza um carro
  updateCarro(car: Carro): Observable<Carro> {
    return this.httpClient.put<Carro>(this.url + '/' + car.id, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um carro
  deleteCar(car: Carro) {
    return this.httpClient.delete<Carro>(this.url + '/' + car.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

   // Tratamento de erros
   handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
