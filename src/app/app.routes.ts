import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ListagemCategoriasComponent } from './views/categorias/listar/listagem-categorias.component';
import { CadastroCategoriasComponent } from './views/categorias/cadastrar/cadastro-categorias.component';
import { EdicaoCategoriaComponent } from './views/categorias/editar/edicao-categoria.component';
import { ExclusaoCategoriaComponent } from './views/categorias/excluir/exclusao-categoria.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'categorias',
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: 'listar', component: ListagemCategoriasComponent },
      { path: 'cadastrar', component: CadastroCategoriasComponent },
      { path: 'editar/:id', component: EdicaoCategoriaComponent },
      { path: 'excluir/:id', component: ExclusaoCategoriaComponent },
    ],
  },
];
