import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {HomeComponent} from './home.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [],
})
export class HomeModule {
}
