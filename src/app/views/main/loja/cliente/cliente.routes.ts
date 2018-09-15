import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ClienteListaComponent } from './lista/cliente.lista.component';
import { ClienteInfoComponent } from './info/cliente.info.component';

export const CLIENTE_ROUTES: Routes = [
    {
        path: '',
        component: ClienteListaComponent
    },
    {
        path: 'novo',
        component: ClienteInfoComponent
    },
    {
        path: ':id',
        component: ClienteInfoComponent
    }
];

@NgModule({

})

export class ClienteRoutes {

}
