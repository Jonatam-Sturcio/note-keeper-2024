import { Routes } from '@angular/router';
import { CadastroCategoriasComponent } from './cadastrar/cadastro-categorias.component';
import { EdicaoCategoriaComponent } from './editar/edicao-categoria.component';
import { ExclusaoCategoriaComponent } from './excluir/exclusao-categoria.component';
import { ListagemCategoriasComponent } from './listar/listagem-categorias.component';

export const categoriaRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListagemCategoriasComponent },
  { path: 'cadastrar', component: CadastroCategoriasComponent },
  { path: 'editar/:id', component: EdicaoCategoriaComponent },
  { path: 'excluir/:id', component: ExclusaoCategoriaComponent },
];
