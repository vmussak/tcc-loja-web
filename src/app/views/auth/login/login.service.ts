import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {

    }

    getUserByLogin(login) {
        return this.http.get(`http://192.168.1.5:4000/api/login/${login}`);
    }

    getLogin(login) {
        return this.http.post(`http://192.168.1.5:4000/api/login`, login);
    }
}

 