import {Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';

export const ERROR_ROUTES: Routes = [
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: 'not-found'}
];
