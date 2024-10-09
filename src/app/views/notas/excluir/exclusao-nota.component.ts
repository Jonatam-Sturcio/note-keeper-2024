import { NgIf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DetalhesNota } from '../models/nota.models';
import { Observable } from 'rxjs';
import { NotaService } from '../services/nota.service';

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
    private notaService: NotaService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] as number;
    this.nota$ = this.notaService.selecionarPorId(this.id);
  }

  excluir() {
    if (!this.id) return;
    this.notaService.excluir(this.id).subscribe((res) => {
      console.log(`Nota ID [${this.id}] excluída com sucesso!`);
      this.router.navigate(['/notas']);
    });
  }
}
