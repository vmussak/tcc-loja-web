import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {UsuarioListaComponent} from './lista/usuario.lista.component';
import {UsuarioInfoComponent} from './info/usuario.info.component';

export const USUARIO_ROUTES: Routes = [
    {
        path: '',
        component: UsuarioListaComponent
    },
    {
        path: 'novo',
        component: UsuarioInfoComponent
    },
    {
        path: ':id',
        component: UsuarioInfoComponent
    }
];

@NgModule({

})

export class UsuarioRoutes {

}
