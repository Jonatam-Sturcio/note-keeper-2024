import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {
  CadastroCategoria,
  CategoriaCriada,
  CategoriaEditada,
  DetalhesCategoria,
  EdicaoCategoria,
  ListagemCategoria,
} from '../models/categoria.models';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly url = `${environment.API_URL}/categorias`;

  constructor(private http: HttpClient) {}

  cadastrar(novaCategoria: CadastroCategoria): Observable<CategoriaCriada> {
    return this.http.post<CategoriaCriada>(this.url, novaCategoria);
  }
  editar(id: number, categoriaEditada: EdicaoCategoria) {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.put<CategoriaEditada>(urlCompleto, categoriaEditada);
  }
  excluir(id: number) {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.delete<any>(urlCompleto);
  }
  selecionarPorId(id: any): Observable<DetalhesCategoria> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http.get<DetalhesCategoria>(urlCompleto);
  }

  selecionarTodos(): Observable<ListagemCategoria[]> {
    return this.http.get<ListagemCategoria[]>(this.url);
  }
}
