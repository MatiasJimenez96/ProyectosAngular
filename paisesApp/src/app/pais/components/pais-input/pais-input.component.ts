import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Country } from '../../interfaces/pais-interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();       //Crea un observable manualmente

  termino: string = 'Arg'

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))        // 300  Milisegundos
      .subscribe( dato => {
        this.onDebounce.emit(dato);
    })
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada( event?: any){
    /* const valor = event.target.value;
    console.log(valor); */
    this.debouncer.next(this.termino);
  }

}
