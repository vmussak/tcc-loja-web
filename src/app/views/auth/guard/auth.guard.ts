import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../../core/utils/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private router: Router) {}

    canActivate (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const token = sessionStorage.getItem('loginProjeto');

        if (token) {
            const user = {
                nome: 'Vinicius Mussak',
                cor: '#0288D1'
            };
            UserService.setUser(user);
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}
