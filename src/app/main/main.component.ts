import { Component, ViewEncapsulation } from '@angular/core';

import { BaseComponent } from '~app/core/components/base';
import { GameSavesService } from '~app/shared/game-saves';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'main-menu',
    },
})
export class MainComponent extends BaseComponent {
    constructor(
        private readonly gameSavesService: GameSavesService,
    ) {
        super();
    }

    get lastSave() {
        return this.gameSavesService.getLastSave();
    }
}
