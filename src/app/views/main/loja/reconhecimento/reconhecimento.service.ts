import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReconhecimentoService {
    constructor(private http: HttpClient) {

    }

    reconhecer(imagem) {
        return this.http.post(`http://192.168.1.5:4000/api/reconhecimento`, {
            imagem: imagem
        });
    }

    buscarDadosPorVisita(id) {
        return this.http.get(`http://192.168.1.5:4000/api/reconhecimento/${id}`);
    }
}

 