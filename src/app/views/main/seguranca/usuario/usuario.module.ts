import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../../../../shared.module';
import {UsuarioInfoComponent} from './info/usuario.info.component';
import {UsuarioListaComponent} from './lista/usuario.lista.component';
import {ComponentsModule} from '../../../../core/components/components.module';
import {UsuarioRoutes} from './usuario.routes';

@NgModule({
    imports: [
        SharedModule,
        ComponentsModule,
        UsuarioRoutes
    ],
    exports: [],
    declarations: [
        UsuarioListaComponent,
        UsuarioInfoComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsuarioModule {
}
