import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {

    }

    getUserByLogin(login) {
        return this.http.get(`http://localhost:4000/api/login/${login}`);
    }

    getLogin(login) {
        return this.http.post(`http://localhost:4000/api/login`, login);
    }
}

 