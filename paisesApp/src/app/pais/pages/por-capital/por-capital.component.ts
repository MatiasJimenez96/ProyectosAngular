import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent implements OnInit {

  termino: string = ''
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);
    this.paisService.buscarCapital(this.termino).subscribe((paises) => {
      this.paises = paises;
    },
      (error) => {
        console.log(error);
        this.hayError = true;
        this.paises = [];

      }
    )
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.mostrarSugerencias = true;
    this.termino = termino
    this.paisService.buscarCapital(termino).subscribe((pais) =>{
      this.paisesSugeridos = pais.splice(0,3)
    },
    (err)=>{
      this.paisesSugeridos = [];
    })
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
  }

}
