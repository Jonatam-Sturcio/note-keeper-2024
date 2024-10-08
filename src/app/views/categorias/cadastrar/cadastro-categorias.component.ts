import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { timeout } from 'rxjs';
import { CadastroCategoria } from '../models/categoria.models';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-cadastro-categorias',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './cadastro-categorias.component.html',
})
export class CadastroCategoriasComponent {
  categoriaForm: FormGroup;

  constructor(
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    this.categoriaForm = new FormGroup({
      titulo: new FormControl(''),
    });
  }

  cadastrar() {
    const novaCategoria: CadastroCategoria = this.categoriaForm.value;

    this.categoriaService.cadastrar(novaCategoria).subscribe((res) => {
      console.log(`Categoria ID [${res.id}] cadastrada com sucesso!`);
      this.router.navigate(['/categorias']);
    });
  }
}
