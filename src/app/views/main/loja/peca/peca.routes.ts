import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { PecaListaComponent } from './lista/peca.lista.component';
import { PecaInfoComponent } from './info/peca.info.component';

export const PECA_ROUTES: Routes = [
    {
        path: '',
        component: PecaListaComponent
    },
    {
        path: 'novo',
        component: PecaInfoComponent
    },
    {
        path: ':id',
        component: PecaInfoComponent
    }
];

@NgModule({

})

export class PecaRoutes {

}
