import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  baseURL: string = 'http://localhost:3000'

  httpClient = inject(HttpClient);

  //constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(`${this.baseURL}/heroes`)
  }

  getHeroeById(id: string): Observable<Heroe> {
    return this.httpClient.get<Heroe>(`${this.baseURL}/heroes/${id}`)
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(`${this.baseURL}/heroes?q=${termino}&_limit=4`)
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.httpClient.post<Heroe>(`${this.baseURL}/heroes`, heroe)

  }
  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.httpClient.put<Heroe>(`${this.baseURL}/heroes/${heroe.id}`, heroe)
  }

  eliminarHeroe(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseURL}/heroes/${id}`)
  }
}
