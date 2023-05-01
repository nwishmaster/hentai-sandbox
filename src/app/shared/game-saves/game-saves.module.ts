import { NgModule } from '@angular/core';

import { GameSavesService } from '~app/shared/game-saves/game-saves.service';
import { SAVES_STORAGE } from '~app/shared/game-saves/game-saves.constans';


@NgModule({
    providers: [
        { provide: SAVES_STORAGE, useValue: localStorage },
        GameSavesService,
    ],
})
export class GameSavesModule { }
