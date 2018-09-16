import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../../../../shared.module';
import {ReconhecimentoInfoComponent} from './info/reconhecimento.info.component';
import {ReconhecimentoDadosComponent} from './dados/reconhecimento.dados.component';
import {ComponentsModule} from '../../../../core/components/components.module';
import {ReconhecimentoRoutes} from './reconhecimento.routes';

@NgModule({
    imports: [
        SharedModule,
        ComponentsModule,
        ReconhecimentoRoutes
    ],
    exports: [],
    declarations: [
        ReconhecimentoInfoComponent,
        ReconhecimentoDadosComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReconhecimentoModule {
}
