import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {UsuarioModule} from './usuario/usuario.module';

@NgModule({
    imports: [SharedModule],
    exports: [
        UsuarioModule
    ],
    declarations: [],
    providers: []
})

export class SegurancaModule {
}
