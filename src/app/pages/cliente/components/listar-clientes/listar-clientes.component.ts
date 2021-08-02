import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';
@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  @Input() clientes!: Cliente[];
  @Input() clientesAux!: Cliente[];
  @Input() filterVisible!: boolean;
  @Input() searchValue!: string;

  @Input() search!: () => void;
  @Input() reset!: () => void;

  listOfCurrentPageData: ReadonlyArray<Cliente> = [];

  constructor() {}

  ngOnInit() {}

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Cliente>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

}
