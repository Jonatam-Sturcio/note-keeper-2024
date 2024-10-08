import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ListagemCategoriasComponent } from './views/categorias/listar/listagem-categorias.component';
import { CadastroCategoriasComponent } from './views/categorias/cadastrar/cadastro-categorias.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'categorias',
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: 'listar', component: ListagemCategoriasComponent },
      { path: 'cadastrar', component: CadastroCategoriasComponent },
    ],
  },
];
