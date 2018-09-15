import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { ClienteInfoComponent } from './info/cliente.info.component';
import { ClienteListaComponent } from './lista/cliente.lista.component';
import { ComponentsModule } from '../../../../core/components/components.module';
import { ClienteRoutes } from './cliente.routes';

@NgModule({
    imports: [
        SharedModule,
        ComponentsModule,
        ClienteRoutes
    ],
    exports: [],
    declarations: [
        ClienteListaComponent,
        ClienteInfoComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClienteModule {
}
