import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

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

  constructor(private modalService: NzModalService) { }

  ngOnInit() {
    console.log('OLA');
  }

  showModalClient() {
    this.isVisible = true;
  }

  addClient(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.success();
  }

  closeModalClient(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  success(): void {
    const modal = this.modalService.success({
      nzTitle: 'Cliente adicionado com sucesso!'
    });
    setTimeout(() => modal.destroy(), 2000);
  }

}
