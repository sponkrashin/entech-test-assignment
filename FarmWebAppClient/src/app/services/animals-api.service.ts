import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateAnimalRequest, Animal } from 'models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalsApiService {
  private url!: string;

  constructor(private httpClient: HttpClient) {
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
