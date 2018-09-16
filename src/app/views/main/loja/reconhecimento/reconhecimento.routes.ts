import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {ReconhecimentoInfoComponent} from './info/reconhecimento.info.component';
import {ReconhecimentoDadosComponent} from './dados/reconhecimento.dados.component';

export const RECONHECIMENTO_ROUTES: Routes = [
    {
        path: '',
        component: ReconhecimentoInfoComponent
    },
    {
        path: ':idVisita',
        component: ReconhecimentoDadosComponent
    }
];

@NgModule({

})

export class ReconhecimentoRoutes {

}
