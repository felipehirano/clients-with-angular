import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
  email: string;
  dataCadastro: string;
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  validateForm!: FormGroup;
  clientes!: Cliente[];

  isVisible = false;

  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      email: 'johnBrown@gmail.com',
      dataCadastro: '22/04/2021'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      email: 'jimGreen@gmail.com',
      dataCadastro: '22/04/2021'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      email: 'joeBlack@gmail.com',
      dataCadastro: '22/04/2021'
    }
  ];

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
    }
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
