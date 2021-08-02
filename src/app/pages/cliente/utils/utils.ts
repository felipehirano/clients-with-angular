import { Injectable } from "@angular/core";
import { Cliente } from "../interfaces/cliente";

@Injectable({
  providedIn: 'root'
})
export class Utils {

  constructor() {}

  formatValues(lista: Cliente[]): void {
    for (const i in lista) {
      lista[i].cnpj = this.formatCNPJ(lista[i].cnpj);
      lista[i].createdProduct = this.formatDate(lista[i].createdProduct);
      lista[i].cliente = lista[i].companyName + " - " + lista[i].cnpj;
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
}
