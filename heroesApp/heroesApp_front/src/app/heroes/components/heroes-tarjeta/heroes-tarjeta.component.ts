import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroes-tarjeta',
  templateUrl: './heroes-tarjeta.component.html',
  styleUrls: ['./heroes-tarjeta.component.css']
})
export class HeroesTarjetaComponent {

  @Input() heroe!: Heroe;

}
