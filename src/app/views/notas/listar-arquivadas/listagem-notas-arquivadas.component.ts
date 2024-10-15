import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ListagemCategoria } from '../../categorias/models/categoria.models';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { ListagemNota } from '../models/nota.models';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-listagem-notas-arquivadas',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './listagem-notas-arquivadas.component.html',
  styleUrl: './listagem-notas-arquivadas.component.scss',
})
export class ListagemNotasArquivadasComponent implements OnInit {
  notas$?: Observable<ListagemNota[]>;
  categorias$?: Observable<ListagemCategoria[]>;

  notasEmCache: ListagemNota[];

  constructor(
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService
  ) {
    this.notasEmCache = [];
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos();
    this.notaService.selecionarArquivadas().subscribe((notas) => {
      this.notasEmCache = notas;

      this.notas$ = of(notas);
    });
  }

  filtrar(categoriaId?: number) {
    const notasFiltradas = this.obterNovasFiltradas(
      this.notasEmCache,
      categoriaId
    );

    this.notas$ = of(notasFiltradas);
  }

  desarquivar(nota: ListagemNota) {
    nota.arquivada = false;

    this.notaService.editar(nota.id, nota).subscribe((res) => {
      this.notificacao.sucesso(
        `O registro ID [${res.id}] foi desarquivado com sucesso!`
      );
    });
  }

  private obterNovasFiltradas(notas: ListagemNota[], categoriaId?: number) {
    if (categoriaId) {
      return notas.filter((n) => n.categoriaId == categoriaId);
    }
    return notas;
  }
}
