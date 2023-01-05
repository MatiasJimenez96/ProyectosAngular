import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  heroesService = inject(HeroesService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  _snackBar = inject(MatSnackBar)
  dialog = inject(MatDialog)
  /*
  Angular 15 - Ya no hay necesidad de un constructor

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }*/


  ngOnInit() {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.heroesService.getHeroeById(id))
        )
        .subscribe(dato => {
          this.heroe = dato;
        })
    }
  }


  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return
    }

    if (this.heroe.id) {
      //actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(resp => {
          this.mostrarSnackBar('Registro actualizado');
        })
    } else {
      //crear
      this.heroesService.agregarHeroe(this.heroe).subscribe(resp => {
        this.router.navigate(['/heroes/editar/', resp.id])
        this.mostrarSnackBar('Registro creado');
      })
    }

  }

  eliminarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed()
      .subscribe(dato => {
        if (dato) {
          this.heroesService.eliminarHeroe(this.heroe.id!)
            .subscribe(dato => {
              this.router.navigate(['/heroes'])
              this.mostrarSnackBar(`Se elimino ${this.heroe.superhero}`);
            })
        }
      })
  }

  mostrarSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    })
  }

}
