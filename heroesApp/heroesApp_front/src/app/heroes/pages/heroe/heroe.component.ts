import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  activatedRoute = inject(ActivatedRoute);

  heroeService = inject(HeroesService);
  router = inject(Router);
  //constructor(private activatedRoute: ActivatedRoute, private heroeService: HeroesService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroeService.getHeroeById(id))
      )
      .subscribe(dato => {
        this.heroe = dato
      })
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }


}
