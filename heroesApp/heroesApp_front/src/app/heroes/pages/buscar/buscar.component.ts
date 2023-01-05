import { Component, inject, Inject } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {

  termino: string = '';
  heroes: Heroe[] = [];

  heroeSeleccionado!: Heroe | undefined;

  heroesService = inject(HeroesService);
  router = inject(Router);
  //constructor(private heroesService: HeroesService, private router: Router) { }

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim()).subscribe(dato => {
      this.heroes = dato;
    })
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero
    this.heroesService.getHeroeById(heroe.id!).subscribe(dato => {
      this.router.navigate([`/heroes/heroe/${dato.id}`]);

      this.heroeSeleccionado = dato;
    })
  }

}
