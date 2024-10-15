import { ListagemCategoria } from '../../categorias/models/categoria.models';

export interface CadastroNota {
  titulo: string;
  conteudo: string;
  categoriaId: number;
  arquivada: boolean;
}

export interface NotaCriada {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
}

export interface EdicaoNota {
  titulo: string;
  conteudo: string;
  categoriaId: number;
}

export interface NotaEditada {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
}

export interface ListagemNota {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
  categoria: ListagemCategoria;
  arquivada: boolean;
}

export interface DetalhesNota {
  id: number;
  titulo: string;
  conteudo: string;
  categoriaId: number;
  categoria: ListagemCategoria;
  arquivada: boolean;
}
