import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Cliente[]>(environment.API_GET);
  }

  insert(cliente: any) {
    return this.http.post(environment.API_POST, cliente);
  }
}
