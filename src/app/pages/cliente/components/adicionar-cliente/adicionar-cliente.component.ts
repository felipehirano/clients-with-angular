import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import validator from 'cpf-cnpj-validator';
import { ClienteService } from '../../cliente.service';
import { NzModalService } from 'ng-zorro-antd/modal';

declare var require: any

const Joi = require('@hapi/joi').extend(validator)

@Component({
  selector: 'app-adicionar-cliente',
  templateUrl: './adicionar-cliente.component.html',
  styleUrls: ['./adicionar-cliente.component.css']
})

export class AdicionarClienteComponent implements OnInit {

  @Input() isVisibleModalClient!: boolean;
  @Output() onClose = new EventEmitter();
  @Output() onUpdateClients = new EventEmitter();

  validateForm!: FormGroup;

  cnpjSchema = Joi.document().cnpj();

  showAlert = false;

  constructor(
    private fb: FormBuilder,
    private clienteService : ClienteService,
    private modalService: NzModalService
  ){}

  ngOnInit() {
    this.initForm();
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

  addClient(formIsValid: boolean): void {

    this.validateFormClient();

    let clienteForm = this.validateForm.value;

    if(formIsValid) {
      if(this.cnpjIsValid(clienteForm)) {
        this.clienteService.insert(clienteForm).subscribe(
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

  validateFormClient(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  printMsgSuccess(msg: string): void {
    const modal = this.modalService.success({
      nzTitle: msg
    });
    setTimeout(() => modal.destroy(), 3000);
    this.updateClients();
  }

  closeModalClient(): void {
    this.showAlert = false;
    this.validateForm.reset();
    this.onClose.emit();
  }

  updateClients(): void {
    this.onUpdateClients.emit();
  }

}
