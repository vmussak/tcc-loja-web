import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../../../../shared.module';
import {PecaInfoComponent} from './info/peca.info.component';
import {PecaListaComponent} from './lista/peca.lista.component';
import {ComponentsModule} from '../../../../core/components/components.module';
import {PecaRoutes} from './peca.routes';

@NgModule({
    imports: [
        SharedModule,
        ComponentsModule,
        PecaRoutes
    ],
    exports: [],
    declarations: [
        PecaListaComponent,
        PecaInfoComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PecaModule {
}
