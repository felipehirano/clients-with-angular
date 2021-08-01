import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from './cliente.service';
import { Cliente } from '../interfaces/cliente';
import validator from 'cpf-cnpj-validator';

declare var require: any

const Joi = require('@hapi/joi').extend(validator)

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cnpjSchema = Joi.document().cnpj();

  validateForm!: FormGroup;
  clientes!: Cliente[];
  clientesAux!: Cliente[];
  listOfCurrentPageData: ReadonlyArray<Cliente> = [];

  searchValue = '';
  isVisibleModalClient = false;
  showAlert = false;
  filtroRazaoSocial = '';
  filterVisible = false;

  dadosModal: any = {
    companyName:  '',
    cnpj: '',
    fantasyName: '',
    legalRepresentative: '',
    email: '',
    phoneNumber: ''
  }

  constructor(private modalService: NzModalService, private fb: FormBuilder, private clienteService : ClienteService) { }

  ngOnInit() {
    this.initForm();
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

  initForm(): void {
    this.validateForm = this.fb.group({
      razaoSocial: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      nome: [null, null],
      representante: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      telefone: [null, [Validators.required]],
    });

    this.resetDadosModal();
    this.showAlert = false;
  }

  resetDadosModal(): void {
    this.dadosModal = {
      companyName:  '',
      cnpj: '',
      fantasyName: '',
      legalRepresentative: '',
      email: '',
      phoneNumber: ''
    }
  }

  showModalClient(): void {
    this.isVisibleModalClient = true;
  }

  addClient(formIsValid: boolean): void {

    this.submitForm();

    if(formIsValid) {
      if(this.cnpjIsValid(this.dadosModal)) {
        this.clienteService.insert(this.dadosModal).subscribe(
          (dados: any) => {
            this.isVisibleModalClient = false;
            this.printMsgSuccess(dados.message);
            this.initForm();
          }
        );
      }else {
        this.showAlert = true;
      }
    }
  }

  cnpjIsValid(cliente: any): boolean {
    if(this.cnpjSchema.validate(cliente.cnpj).error) return false;
    else return true;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  closeModalClient(): void {
    this.initForm();
    this.isVisibleModalClient = false;
  }

  printMsgSuccess(msg: string): void {
    const modal = this.modalService.success({
      nzTitle: msg
    });
    setTimeout(() => modal.destroy(), 3000);
    this.listClients();
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

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Cliente>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

}
