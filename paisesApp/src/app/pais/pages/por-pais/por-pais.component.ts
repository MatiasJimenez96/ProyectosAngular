import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent implements OnInit {

  termino: string = ''
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);
    this.paisService.buscarPais(this.termino).subscribe((paises) => {
      console.log(paises);
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
    // 
  }

}
