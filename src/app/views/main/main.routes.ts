import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AuthGuard} from '../auth/guard/auth.guard';
import {HOME_ROUTES} from './home/home.routes';
import {LOJA_ROUTES} from './loja/loja.routes';

export const MAIN_ROUTES: Routes = [{
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
        ...HOME_ROUTES,
        ...LOJA_ROUTES,
    ]
}];
