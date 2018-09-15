import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PecaModule } from './peca/peca.module';

@NgModule({
    imports: [SharedModule],
    exports: [
        UsuarioModule,
        PecaModule
    ],
    declarations: [],
    providers: []
})

export class LojaModule {
}
