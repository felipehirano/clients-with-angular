import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './interfaces/cliente';

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

  constructor(private clienteService : ClienteService) {}

  ngOnInit() {
    this.listClients();
  }

  listClients() : void {
    this.clienteService.list().subscribe(
      (dados: any) => {
          this.clientes = dados.content;
          this.formatValues();

          this.clientesAux = this.clientes;
        }
    );
  }

  formatValues(): void {
    for (const i in this.clientes) {
      this.clientes[i].cnpj = this.formatCNPJ(this.clientes[i].cnpj);
      this.clientes[i].createdProduct = this.formatDate(this.clientes[i].createdProduct);
      this.clientes[i].cliente = this.clientes[i].companyName + " - " + this.clientes[i].cnpj;
    }
  }

  formatCNPJ(cnpj: string): string {
    return cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\/\$4");
  }

  formatDate(dateProduct: any): string {

    const dd = dateProduct.slice(8,10);
    const mm = dateProduct.slice(5, 7);
    const yy = dateProduct.slice(0, 4);

    return dd + '/' + mm + '/' + yy;
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
