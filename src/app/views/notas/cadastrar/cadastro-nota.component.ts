import {
  AsyncPipe,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import {
  DetalhesCategoria,
  ListagemCategoria,
} from '../../categorias/models/categoria.models';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CadastroNota } from '../models/nota.models';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-cadastro-nota',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
  ],
  templateUrl: './cadastro-nota.component.html',
  styleUrl: './cadastro-nota.component.scss',
})
export class CadastroNotaComponent implements OnInit {
  notaForm: FormGroup;

  categorias$?: Observable<ListagemCategoria[]>;

  constructor(
    private router: Router,
    private notaService: NotaService,
    private categoriaService: CategoriaService
  ) {
    this.notaForm = new FormGroup({
      titulo: new FormControl<string>(''),
      conteudo: new FormControl<string>(''),
      categoriaId: new FormControl<number>(0),
    });
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.selecionarTodos();
  }

  cadastrar() {
    const novaNota: CadastroNota = this.notaForm.value;

    this.notaService.cadastrar(novaNota).subscribe((res) => {
      console.log(`O registro ID [${res.id}] foi cadastrado com sucesso!`);

      this.router.navigate(['/notas']);
    });
  }

  campoNaoFoiTocado(campo: string): boolean {
    const controle = this.notaForm.get(campo);

    if (!controle) return false;

    return controle.pristine;
  }
}