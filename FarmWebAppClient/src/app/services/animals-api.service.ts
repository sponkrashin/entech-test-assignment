import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT_TOKEN, Environment } from 'environment';
import { CreateAnimalRequest, Animal } from 'models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalsApiService {
  private url!: string;

  constructor(
    private httpClient: HttpClient,
    @Inject(ENVIRONMENT_TOKEN) environment: Environment
  ) {
    this.url = `${environment.apiUrl}/animals`;
  }

  getAll(): Observable<Animal[]> {
    return this.httpClient.get<Animal[]>(this.url);
  }

  create(request: CreateAnimalRequest): Observable<any> {
    return this.httpClient.post(this.url, request);
  }

  delete(name: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/${name}`);
  }
}
