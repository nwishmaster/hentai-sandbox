import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { StartComponent } from '~app/main/start/start.component';


const routes: Route[] = [
    {
        path: '',
        component: StartComponent,
    },
];

@NgModule({
    declarations: [
        StartComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
})
export class StartModule {}
