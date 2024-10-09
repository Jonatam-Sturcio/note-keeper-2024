import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {
  CadastroNota,
  NotaCriada,
  NotaEditada,
  DetalhesNota,
  EdicaoNota,
  ListagemNota,
} from '../models/nota.models';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private readonly url = `${environment.API_URL}/notas`;

  constructor(private http: HttpClient) {}

  cadastrar(novaNota: CadastroNota): Observable<NotaCriada> {
    return this.http.post<NotaCriada>(this.url, novaNota);
  }

  editar(id: number, NotaEditada: EdicaoNota) {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<NotaEditada>(urlCompleto, NotaEditada);
  }

  excluir(id: number) {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.delete<any>(urlCompleto);
  }

  selecionarPorId(id: any): Observable<DetalhesNota> {
    const urlCompleto = `${this.url}?_expand=categoria`;
    return this.http.get<DetalhesNota>(urlCompleto);
  }

  selecionarTodos(): Observable<ListagemNota[]> {
    const urlCompleto = `${this.url}?_expand=categoria`;
    return this.http.get<ListagemNota[]>(urlCompleto);
  }
}
