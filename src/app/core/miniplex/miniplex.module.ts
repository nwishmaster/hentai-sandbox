import { NgModule } from '@angular/core';
import { World } from 'miniplex';

import { DayCircleSystem } from '~app/core/miniplex/systems/day-circle/day-circle.system';
import { ExtractHelperFactory } from '~app/core/miniplex/decorators/extract-helper.factory';
import { MINIPLEX_SYSTEMS_TOKEN, MINIPLEX_WORLD_TOKEN } from '~app/core/miniplex/miniplex.contants';
import { MiniplexService } from '~app/core/miniplex/miniplex.service';
import { TransferToLocationSystem } from '~app/core/miniplex/systems/transfer-to-location';

const world = new World();
const essentialSystems = [
    DayCircleSystem,
    TransferToLocationSystem,
];

@NgModule({
    providers: [
        { provide: MINIPLEX_WORLD_TOKEN, useValue: world },
        { provide: MINIPLEX_SYSTEMS_TOKEN, useValue: essentialSystems },
        MiniplexService,
        ExtractHelperFactory,
    ],
})
export class MiniplexModule {
    constructor(
        _extractHelper: ExtractHelperFactory,
    ) {}
}
