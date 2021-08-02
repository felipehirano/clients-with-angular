import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './interfaces/cliente';
import { Utils } from './utils/utils';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes!: Cliente[];
  clientesAux!: Cliente[];

  searchValue = '';
  isVisibleModalClient = false;
  filterVisible = false;

  constructor(
    private clienteService : ClienteService,
    private utils: Utils
  ) {}

  ngOnInit() {
    this.listClients();
  }

  listClients() : void {
    this.clienteService.list().subscribe(
      (dados: any) => {
          this.clientes = dados.content;
          this.utils.formatValues(this.clientes);

          this.clientesAux = this.clientes;
        }
    );
  }

  showModalClient(): void {
    this.isVisibleModalClient = true;
  }

  closeModalClient(): void {
    this.isVisibleModalClient = false;
  }

  reset(): void {
    this.searchValue = '';
    this.filterVisible = false;
    this.clientes = this.clientesAux;
  }

  search(): void {
    this.filterVisible = false;
    this.clientes = this.clientes.filter((item: any) => item.cliente.indexOf(this.searchValue) !== -1);
    console.log(this.clientes);
  }

}
