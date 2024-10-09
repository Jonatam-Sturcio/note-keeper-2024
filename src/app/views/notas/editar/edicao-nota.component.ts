import {
  NgIf,
  NgForOf,
  NgSwitch,
  NgSwitchCase,
  AsyncPipe,
} from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ListagemCategoria } from '../../categorias/models/categoria.models';
import { CategoriaService } from '../../categorias/services/categoria.service';
import { CadastroNota, DetalhesNota, NotaCriada } from '../models/nota.models';
import { NotaService } from '../services/nota.service';
@Component({
  selector: 'app-edicao-nota',
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
  templateUrl: './edicao-nota.component.html',
})
export class EdicaoNotaComponent {
  id?: number;
  notaForm: FormGroup;

  categorias$?: Observable<ListagemCategoria[]>;
  constructor(
    private route: ActivatedRoute,
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
    this.id = this.route.snapshot.params['id'] as number;
    this.categorias$ = this.categoriaService.selecionarTodos();
    this.notaService
      .selecionarPorId(this.id)
      .subscribe((res) => this.carregarFormulario(res));
  }
  editar() {
    if (!this.id) return;
    const notaEditada = this.notaForm.value as CadastroNota;
    this.notaService.editar(this.id, notaEditada).subscribe((res) => {
      console.log(`Nota ID [${res.id}] editada com sucesso!`);
      this.router.navigate(['/notas']);
    });
  }
  private carregarFormulario(registro: DetalhesNota) {
    this.notaForm.patchValue(registro);
    Object.keys(this.notaForm.controls).forEach((campo) => {
      const control = this.notaForm.get(campo);
      control?.markAsDirty();
    });
  }
}
