import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AuthGuard} from '../auth/guard/auth.guard';
import {HOME_ROUTES} from './home/home.routes';
import {SEGURANCA_ROUTES} from './seguranca/seguranca.routes';

export const MAIN_ROUTES: Routes = [{
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
        ...HOME_ROUTES,
        ...SEGURANCA_ROUTES,
    ]
}];
