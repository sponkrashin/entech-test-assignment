import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [CommonModule, AnimalComponent],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.scss',
})
export class AnimalsListComponent implements OnInit {
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

  async deleteAnimal(animal: Animal): Promise<void> {
    await firstValueFrom(this.animalsApi.delete(animal.name));
    this.reloadData();
  }

  private reloadData(): void {
    this.reloadSubject.next(null);
  }
}
