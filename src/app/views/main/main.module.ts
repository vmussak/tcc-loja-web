import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {UserService} from '../../core/utils/user/user.service';
import {MainComponent} from './main.component';
import {HomeModule} from './home/home.module';
import {SegurancaModule} from './seguranca/seguranca.module';

@NgModule({
    imports: [
        SharedModule,
        HomeModule,
        SegurancaModule
    ],
    exports: [],
    declarations: [MainComponent],
    providers: [UserService]
})
export class MainModule {
}
