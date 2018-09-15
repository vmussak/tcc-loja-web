import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PecaService {
    constructor(private http: HttpClient) {

    }

    selecionar(filtro) {
        return this.http.get(`http://192.168.1.5:4000/api/peca?filtro=${(filtro || '')}`);
    }

    buscar(id) {
        return this.http.get(`http://192.168.1.5:4000/api/peca/${id}`);
    }

    buscarTiposPeca() {
        return this.http.get(`http://192.168.1.5:4000/api/tipo-peca`);
    }

    cadastrar(peca) {
        return this.http.post(`http://192.168.1.5:4000/api/peca`, peca);
    }

    atualizar(peca) {
        return this.http.put(`http://192.168.1.5:4000/api/peca/${peca.id}`, peca);
    }

    excluir(id) {
        return this.http.delete(`http://192.168.1.5:4000/api/peca/${id}`);
    }
}

 