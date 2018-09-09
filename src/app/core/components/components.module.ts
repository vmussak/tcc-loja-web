import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: []
})

export class ComponentsModule {

}
