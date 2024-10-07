import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ShellComponent } from './core/components/shell/shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCardModule, ShellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
