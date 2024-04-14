import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  firstValueFrom,
  map,
  switchMap,
} from 'rxjs';

import { AnimalComponent } from 'animals/animal/animal.component';
import { Animal } from 'models';
import { AnimalsApiService } from 'services/animals-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AnimalComponent],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.scss',
})
export class AnimalsListComponent implements OnInit {
  newAnimalName: WritableSignal<string> = signal('');
  animals$!: Observable<Animal[]>;

  private reloadSubject = new BehaviorSubject(null);

  constructor(private animalsApi: AnimalsApiService) {}

  ngOnInit(): void {
    this.animals$ = this.reloadSubject.pipe(
      switchMap(() =>
        this.animalsApi
          .getAll()
          .pipe(
            map((animals) =>
              animals.sort((a, b) => a.name.localeCompare(b.name))
            )
          )
      )
    );
  }

  async addAnimal(): Promise<void> {
    if (!this.newAnimalName()) {
      alert('Animal name should be set');
      return;
    }

    try {
      await firstValueFrom(
        this.animalsApi.create({ name: this.newAnimalName() })
      );

      this.newAnimalName.set('');

      this.reloadData();
    } catch {
      alert('An error occurred during the API call. Please try again later.');
    }
  }

  async deleteAnimal(animal: Animal): Promise<void> {
    try {
      await firstValueFrom(this.animalsApi.delete(animal.name));
      this.reloadData();
    } catch {
      alert('An error occurred during the API call. Please try again later.');
    }
  }

  private reloadData(): void {
    this.reloadSubject.next(null);
  }
}
