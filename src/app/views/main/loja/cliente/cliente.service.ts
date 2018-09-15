import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClienteService {
    constructor(private http: HttpClient) {

    }

    selecionar(filtro) {
        return this.http.get(`http://192.168.1.5:4000/api/cliente?filtro=${(filtro || '')}`);
    }

    buscar(id) {
        return this.http.get(`http://192.168.1.5:4000/api/cliente/${id}`);
    }

    cadastrar(cliente) {
        return this.http.post(`http://192.168.1.5:4000/api/cliente`, cliente);
    }

    atualizar(cliente) {
        return this.http.put(`http://192.168.1.5:4000/api/cliente/${cliente.id}`, cliente);
    }

    excluir(id) {
        return this.http.delete(`http://192.168.1.5:4000/api/cliente/${id}`);
    }
}

 