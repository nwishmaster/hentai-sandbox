import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { GameSavesModule } from '~app/shared/game-saves';
import { MainComponent } from '~app/main/main.component';


const routes: Route[] = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'start',
        loadChildren: () => import('./start/start.module').then(({ StartModule }) => StartModule),
    },
];

@NgModule({
    declarations: [
        MainComponent,
    ],
    imports: [
        CommonModule,
        GameSavesModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        TranslocoModule,
    ],
})
export class MainModule {}
