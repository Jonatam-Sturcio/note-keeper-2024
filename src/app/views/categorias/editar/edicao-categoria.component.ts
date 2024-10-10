import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { DetalhesCategoria, EdicaoCategoria } from '../models/categoria.models';
import { NgIf } from '@angular/common';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-edicao-categoria',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './edicao-categoria.component.html',
})
export class EdicaoCategoriaComponent implements OnInit {
  id?: number;
  categoriaForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacao: NotificacaoService
  ) {
    this.categoriaForm = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] as number;
    this.categoriaService
      .selecionarPorId(this.id)
      .subscribe((res) => this.carregarFormulario(res));
  }

  get titulo() {
    return this.categoriaForm.get('titulo');
  }

  editar() {
    if (this.categoriaForm.invalid) return;

    const categoriaEditada = this.categoriaForm.value as EdicaoCategoria;

    if (!this.id) return;

    this.categoriaService.editar(this.id, categoriaEditada).subscribe((res) => {
      this.notificacao.erro(`Categoria ID [${res.id}] editada com sucesso!`);
      this.router.navigate(['/categorias']);
    });
  }

  private carregarFormulario(registro: DetalhesCategoria) {
    this.categoriaForm.patchValue(registro);
  }
}
