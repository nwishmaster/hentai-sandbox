import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { GameComponent } from '~app/game/game.component';
import { GameSavesModule } from '~app/shared/game-saves';
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
        GameSavesModule,
        RouterModule.forChild(routes),
    ],
})
export class GameModule {}
