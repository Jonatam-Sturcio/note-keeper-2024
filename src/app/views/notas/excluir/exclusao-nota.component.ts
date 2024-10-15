import { NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DetalhesNota } from '../models/nota.models';
import { Observable } from 'rxjs';
import { NotaService } from '../services/nota.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-exclusao-nota',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './exclusao-nota.component.html',
})
export class ExclusaoNotaComponent {
  id?: number;
  nota$?: Observable<DetalhesNota>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notaService: NotaService,
    private notificacao: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) {
      this.notificacao.erro('Não foi possível recuperar o id requisitado.');

      return;
    }
    this.nota$ = this.notaService.selecionarPorId(this.id);
  }

  excluir() {
    if (!this.id) return;
    this.notaService.excluir(this.id).subscribe((res) => {
      this.notificacao.sucesso(`Nota ID [${this.id}] excluída com sucesso!`);
    });

    this.nota$?.subscribe((obj) => {
      if (obj.arquivada) this.router.navigate(['/notas/arquivadas']);
      else this.router.navigate(['/notas']);
    });
  }

  voltar() {
    this.nota$?.subscribe((obj) => {
      if (obj.arquivada) this.router.navigate(['/notas/arquivadas']);
      else this.router.navigate(['/notas']);
    });
  }
}
