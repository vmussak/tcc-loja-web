import {Routes} from '@angular/router';
import {USUARIO_ROUTES} from './usuario/usuario.routes';
import {PECA_ROUTES} from './peca/peca.routes';
import {CLIENTE_ROUTES} from './cliente/cliente.routes';

export const LOJA_ROUTES: Routes = [
    {
        path: 'usuario',
        children: [
            ...USUARIO_ROUTES
        ]
    },
    {
        path: 'peca',
        children: [
            ...PECA_ROUTES
        ]
    },
    {
        path: 'cliente',
        children: [
            ...CLIENTE_ROUTES
        ]
    }
];

