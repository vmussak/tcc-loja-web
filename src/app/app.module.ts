import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { AuthModule } from './views/auth/auth.module';
import { ErrorModule } from './views/error/error.module';
import { MainModule } from './views/main/main.module';
import { AppRoutes } from './app.routes';
import { ComponentsModule } from './core/components/components.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SharedModule,
        AppRoutes,
        AuthModule,
        ErrorModule,
        MainModule,
        ComponentsModule,
        HttpClientModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
