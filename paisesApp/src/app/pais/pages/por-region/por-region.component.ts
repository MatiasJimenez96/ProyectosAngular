import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['Africa', 'America','Asia', 'Europe','Oceania'];
  regionActiva: string = '';
  paises: Country[]= [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  getClaseCSS( region: string): string{
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activarRegion (region: string){
    this.regionActiva = region;
    this.regionActiva = ''
    this.paisService.buscarRegion( region )
      .subscribe( paises => {
        this.paises = paises
      })
  }



}
