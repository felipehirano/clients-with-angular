import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  validateForm!: FormGroup;
  clientes!: Cliente[];

  isVisible = false;

  constructor(private modalService: NzModalService, private fb: FormBuilder, private clienteService : ClienteService) { }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit() {
    this.initForm();
    this.listClients();
  }

  listClients() : void {
    this.clienteService.list().subscribe(
      (dados: any) => {
          this.clientes = dados.content;
          this.formatValues();
        }
    );
  }

  formatValues(): void {
    for (const i in this.clientes) {
      this.clientes[i].cnpj = this.clientes[i].cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\/\$4");
      this.clientes[i].createdProduct = this.formatDate(this.clientes[i].createdProduct);
    }
  }

  formatDate(dateProduct: any): string {

    const dd = dateProduct.slice(8,10);
    const mm = dateProduct.slice(5, 7);
    const yy = dateProduct.slice(0, 4);

    return dd + '/' + mm + '/' + yy;
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      razaoSocial: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      nome: [null, null],
      representante: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      telefone: [null, [Validators.required]],
    });
  }

  showModalClient(): void {
    this.isVisible = true;
  }

  addClient(): void {
    // this.isVisible = false;
    this.submitForm();
    console.log(this.clientes);
    // this.success();
  }

  closeModalClient(): void {
    this.initForm();
    this.isVisible = false;
  }

  success(): void {
    const modal = this.modalService.success({
      nzTitle: 'Cliente adicionado com sucesso!'
    });
    setTimeout(() => modal.destroy(), 2000);
  }

}
