import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, of, map } from 'rxjs';
import { usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = 'http://localhost:3000';
  private _usuario: usuario | undefined;

  get usuario():usuario {
    return { ...this._usuario! } // Los puntos son para solo lectura
  }

  constructor(
    private httpClient: HttpClient
    ) { }

  verificarAutenticacion(): Observable<boolean>{
    if(!localStorage.getItem('id')){
      return of(false);
    }
    return this.httpClient.get<usuario>(`${this.baseURL}/usuarios/1`)
      .pipe(
        map( dato => {
          this._usuario = dato
          return true
        })
      )
  }

  login() {
    return this.httpClient.get<usuario>(`${this.baseURL}/usuarios/1`)
      .pipe(
        tap(dato => this._usuario = dato), // Me permite obtener el observable sin interreumpir el observable del return
        tap(dato => localStorage.setItem('id', dato.id)) // Me permite obtener el observable sin interreumpir el observable del return
      )
  }

  logout(){
    this._usuario = undefined;
    localStorage.removeItem('id')
  }
}
