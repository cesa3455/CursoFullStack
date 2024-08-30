import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApp } from 'app/models/response';
import { Quarto } from 'app/models/quarto'; // Importe a classe Quarto correta
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root',
})
export class QuartoService extends DefaultService {
  constructor(private http: HttpClient) {
    super('quartos');
  }

  list(): Observable<Quarto[]> {
    return this.http.get<Quarto[]>(this.url);
  }

  findById(id: string): Observable<ResponseApp<Quarto>> {
    return this.http.get<ResponseApp<Quarto>>(`${this.url}/${id}`);
  }

  create(quarto: Quarto): Observable<ResponseApp<Quarto>> {
    return this.http.post<ResponseApp<Quarto>>(this.url, quarto);
  }

  edit(quarto: Quarto): Observable<ResponseApp<Quarto>> {
    return this.http.put<ResponseApp<Quarto>>(`${this.url}/${quarto.idQuarto}`, quarto);
  }

  delete(id: string): Observable<ResponseApp<Quarto>> {
    return this.http.delete<ResponseApp<Quarto>>(`${this.url}/${id}`);
  }
}
