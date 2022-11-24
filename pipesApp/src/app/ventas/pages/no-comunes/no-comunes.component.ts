import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styleUrls: ['./no-comunes.component.css']
})
export class NoComunesComponent implements OnInit {

  // i18Select
  nombre: string = 'susana';
  genero: string = 'femenino';


  invitacionMap = {
    'masculino': 'invitarlo',
    'femenino': 'invitarla'
  }

  // i18nPlural
  clientes: string[] = [' Rigoberto', ' maria', ' pepito', ' carlitos']
  clientesMap = {
    '=0': 'no tenemos ningun cliente esperando!',
    '=1': 'tenemos un cliente esperando!',
    'other': 'tenemos # clientes esperando!'
  }

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  cambiarNombre() {
    this.nombre = (this.nombre == 'susana') ? 'carlos' : 'susana'
    this.genero = (this.genero === 'femenino') ? 'masculino' : 'femenino'
  }

  borrarCliente() {
    this.clientes.pop();
  }

  // KeyValue pipe
  persona = {
    nombre: 'Reparati',
    edad: 26,
    direccion: 'Calle falsa 123'
  }

  // Json pipe
  heroes = [
    {
      nombre: 'Invencible',
      vuela: true
    },
    {
      nombre: 'Cecil',
      vuela: false
    },
    {
      nombre: 'Inmortal',
      vuela: true
    },
  ]

  // Async Pipe
  miObservable = interval(1000); // 0, 1, 2, 3

  valorPromesa = new Promise( (resolve, rejent) =>{
    setTimeout(() => {
      resolve('Tenemos data de promesa')
    }, 5000);
  } )
}
