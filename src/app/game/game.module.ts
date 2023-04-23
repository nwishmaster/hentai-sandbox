import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { GameComponent } from '~app/game/game.component';
import { LoopStateModule } from '~app/game/states/loop';

const routes: Route[] = [
    {
        path: '',
        component: GameComponent,
    },
];

@NgModule({
    declarations: [
        GameComponent,
    ],
    imports: [
        CommonModule,
        LoopStateModule,
        RouterModule.forChild(routes),
    ],
})
export class GameModule {}
