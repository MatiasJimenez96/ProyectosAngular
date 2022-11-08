import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey      : string = 'C8mIqFe9sKRphOpAMzKm78SKP7gExcHk';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial  : string[] = [];

  public resultados:Gif[] = [];

  constructor(private http:HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
   }

  get historial(){
    return [...this._historial]
  }

  buscarGifs( data: string ){

    data = data.trim().toLowerCase();

    if(!this._historial.includes( data )){                                  // Si el hisotrial no incluye data lo agrega
      this._historial.unshift( data );                                      // Agrego data
      this._historial = this._historial.splice(0,10);                       // Corto la lista en 10
      localStorage.setItem('historial', JSON.stringify(this._historial) );   // JSON.stringify(); Convierte en string
    }

    const params = new HttpParams()
                          .set('api_key', this.apikey)
                          .set('limit', '10')
                          .set('q', data);

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl}/search`, { params })
      .subscribe( (resp:any) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados) );
      })
  }

 
}
