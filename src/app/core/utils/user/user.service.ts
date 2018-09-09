import {Injectable} from '@angular/core';

let user: any = {};

@Injectable()
export class UserService {

    constructor() {

    }

    public static getUser() {
        return user;
    }

    public static setUser(newUser) {
        user = newUser;
    }

    public static remove() {
        user = null;
        sessionStorage.removeItem('loginProjeto');
    }
}
