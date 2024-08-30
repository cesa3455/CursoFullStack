import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApp } from 'app/models/response';
import { Funcionario } from 'app/models/funcionario';
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService extends DefaultService {
  constructor(private http: HttpClient) {
    super('funcionarios');
  }

  list(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.url);
  }

  findById(id: string): Observable<ResponseApp<Funcionario>> {
    return this.http.get<ResponseApp<Funcionario>>(`${this.url}/${id}`);
  }

  create(funcionario: Funcionario): Observable<ResponseApp<Funcionario>> {
    return this.http.post<ResponseApp<Funcionario>>(this.url, funcionario);
  }

  edit(funcionario: Funcionario): Observable<ResponseApp<Funcionario>> {
    return this.http.put<ResponseApp<Funcionario>>(`${this.url}/${funcionario.idFuncionario}`, funcionario);
  }

  delete(id: string): Observable<ResponseApp<Funcionario>> {
    return this.http.delete<ResponseApp<Funcionario>>(`${this.url}/${id}`);
  }
}
