import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PecaModule } from './peca/peca.module';
import { ClienteModule } from './cliente/cliente.module';

@NgModule({
    imports: [SharedModule],
    exports: [
        UsuarioModule,
        PecaModule,
        ClienteModule,
    ],
    declarations: [],
    providers: []
})

export class LojaModule {
}
