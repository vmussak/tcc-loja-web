import {Routes} from '@angular/router';
import {USUARIO_ROUTES} from './usuario/usuario.routes';

export const SEGURANCA_ROUTES: Routes = [
    {
        path: 'usuario',
        children: [
            ...USUARIO_ROUTES
        ]
    }
];

