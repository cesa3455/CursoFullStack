// Importe os módulos necessários
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { idUserLogged } from 'app/app.component';
import { ResponseApp } from 'app/models/response';
import { Reserva } from 'app/models/reserva'; // Certifique-se de importar o modelo Reserva correto
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root',
})
export class ReservaService extends DefaultService {
  constructor(private http: HttpClient) {
    super('reservas');
  }

  // Atualize o método 'list' para aceitar um parâmetro de filtro, se necessário
  list(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.url}`);
  }

  findById(id: string): Observable<ResponseApp<Reserva>> {
    return this.http.get<ResponseApp<Reserva>>(`${this.url}/${id}`);
  }

  create(reserva: Reserva): Observable<ResponseApp<Reserva>> {
    return this.http.post<ResponseApp<Reserva>>(this.url, reserva);
  }

  edit(reserva: Reserva): Observable<ResponseApp<Reserva>> {
    return this.http.put<ResponseApp<Reserva>>(`${this.url}/${reserva.idReserva}`, reserva);
  }

  delete(id: string): Observable<ResponseApp<Reserva>> {
    return this.http.delete<ResponseApp<Reserva>>(`${this.url}/${id}`);
  }
}
