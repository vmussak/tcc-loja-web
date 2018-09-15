import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) {

    }

    selecionar(filtro) {
        return this.http.get(`http://localhost:4000/api/usuario?filtro=${(filtro || '')}`);
    }

    buscar(id) {
        return this.http.get(`http://localhost:4000/api/usuario/${id}`);
    }

    cadastrar(usuario) {
        return this.http.post(`http://localhost:4000/api/usuario`, usuario);
    }

    atualizar(usuario) {
        return this.http.put(`http://localhost:4000/api/usuario/${usuario.id}`, usuario);
    }

    excluir(id) {
        return this.http.delete(`http://localhost:4000/api/usuario/${id}`);
    }
}

 