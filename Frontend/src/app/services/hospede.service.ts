import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApp } from 'app/models/response';
import { Hospede } from 'app/models/hospede'; // Certifique-se de importar corretamente o modelo de Hospede
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root',
})
export class HospedeService extends DefaultService {
  constructor(private http: HttpClient) {
    super('hospedes');
  }

  list(): Observable<Hospede[]> {
    return this.http.get<Hospede[]>(this.url);
  }

  findById(id: string): Observable<ResponseApp<Hospede>> {
    return this.http.get<ResponseApp<Hospede>>(`${this.url}/${id}`);
  }

  create(hospede: Hospede): Observable<ResponseApp<Hospede>> {
    return this.http.post<ResponseApp<Hospede>>(this.url, hospede);
  }

  edit(hospede: Hospede): Observable<ResponseApp<Hospede>> {
    return this.http.put<ResponseApp<Hospede>>(`${this.url}/${hospede.idHospede}`, hospede);
  }

  delete(id: string): Observable<ResponseApp<Hospede>> {
    return this.http.delete<ResponseApp<Hospede>>(`${this.url}/${id}`);
  }
}
