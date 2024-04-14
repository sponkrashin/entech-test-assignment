import { CommonModule } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
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
import { NotificationsService } from 'services/notifications.service';

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AnimalComponent],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.scss',
})
export class AnimalsListComponent {
  newAnimalName: WritableSignal<string> = signal('');
  animals$!: Observable<Animal[]>;

  private reloadSubject = new BehaviorSubject(null);

  constructor(
    private animalsApi: AnimalsApiService,
    private notificationsService: NotificationsService
  ) {
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

    await firstValueFrom(
      this.animalsApi.create({ name: this.newAnimalName() })
    );

    this.newAnimalName.set('');

    this.reloadData();
  }

  async deleteAnimal(animal: Animal): Promise<void> {
    await firstValueFrom(this.animalsApi.delete(animal.name));
    this.reloadData();
  }

  private reloadData(): void {
    this.reloadSubject.next(null);
  }
}
