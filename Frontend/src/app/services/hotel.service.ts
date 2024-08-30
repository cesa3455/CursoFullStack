import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApp } from 'app/models/response';
import { Hotel } from 'app/models/hotel';
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root',
})
export class HotelService extends DefaultService {
  constructor(private http: HttpClient) {
    super('hoteis');
  }

  list(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.url);
  }

  findById(id: string): Observable<ResponseApp<Hotel>> {
    return this.http.get<ResponseApp<Hotel>>(`${this.url}/${id}`);
  }

  create(hotel: Hotel): Observable<ResponseApp<Hotel>> {
    return this.http.post<ResponseApp<Hotel>>(this.url, hotel);
  }

  edit(hotel: Hotel): Observable<ResponseApp<Hotel>> {
    return this.http.put<ResponseApp<Hotel>>(`${this.url}/${hotel.idHotel}`, hotel);
  }

  delete(id: String): Observable<ResponseApp<Hotel>> {
    return this.http.delete<ResponseApp<Hotel>>(`${this.url}/${id}`);
  }
}
