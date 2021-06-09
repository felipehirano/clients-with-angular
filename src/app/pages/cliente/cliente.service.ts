import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API_GET = 'https://gsb-new-onboarding-api-gateway.herokuapp.com/pix-pos-service/clients';
  private readonly API_POST = 'https://gsb-new-onboarding-api-gateway.herokuapp.com/pix-pos-service/clients/create-client-pj';


  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Cliente[]>(this.API_GET);
  }

  insert(cliente: any) {
    return this.http.post(this.API_POST, cliente);
  }
}
