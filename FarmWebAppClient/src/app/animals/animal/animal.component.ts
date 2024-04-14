import { Component, input, output } from '@angular/core';
import { Animal } from 'models';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.scss',
})
export class AnimalComponent {
  animal = input.required<Animal>();
  delete = output<Animal>();

  deleteAnimal(): void {
    this.delete.emit(this.animal());
  }
}
