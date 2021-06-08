import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'https://gsb-new-onboarding-api-gateway.herokuapp.com/pix-pos-service/clients'
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Cliente[]>(this.API);
  }
}
