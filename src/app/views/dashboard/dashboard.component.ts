import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ItemDashboard } from './models/item-dashboard.model';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NgForOf, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  itens: ItemDashboard[] = [
    {
      titulo: 'Categorias',
      descricao: 'Gerencie as categorias utilizadas para organizar as notas.',
      rota: '/categorias',
    },
    {
      titulo: 'Notas',
      descricao:
        'Gerencie as suas tarefas do dia-a-dia com notas que você pode organizar.',
      rota: '/notas',
    },
  ];
}
