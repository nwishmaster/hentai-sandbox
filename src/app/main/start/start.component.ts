import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { World } from 'miniplex';

import { BaseComponent } from '~app/core/components/base';
import { ControllableMarker } from '~app/core/miniplex/systems/controllable-marker';
import { DayCircle } from '~app/core/miniplex/systems/day-circle';
import { ENTITY_ID_KEY } from '~app/core/miniplex/systems/id';
import { Location } from '~app/core/miniplex/systems/location';
import { MINIPLEX_WORLD_TOKEN } from '~app/core/miniplex';

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss'],
})
export class StartComponent extends BaseComponent {
    constructor(
        @Inject(MINIPLEX_WORLD_TOKEN)
        private readonly world: World,
        private readonly router: Router,
    ) {
        super();
    }

    // TODO: VARIOUS of settings will be here
    // for now just init basic entities and redirect to the game
    protected override initValues() {
        this.world.add<DayCircle>({ [ENTITY_ID_KEY]: 'worldTime', worldTime: new Date('1376-01-01') });

        this.world.add<ControllableMarker>({ [ENTITY_ID_KEY]: 'player', isControllable: true });

        this.world.add<Location>({ [ENTITY_ID_KEY]: 'id-A', location: 'A', rootLocation: null });
        this.world.add<Location>({ [ENTITY_ID_KEY]: 'id-B', location: 'B', rootLocation: null });
        this.world.add<Location>({ [ENTITY_ID_KEY]: 'id-C', location: 'C', rootLocation: null });
        this.world.add<Location>({ [ENTITY_ID_KEY]: 'id-D', location: 'D', rootLocation: null });

        this.router.navigate(['/game']);
    }
}
