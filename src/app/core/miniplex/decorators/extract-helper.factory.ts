import { Inject, Injectable, OnDestroy } from '@angular/core';
import { World } from 'miniplex';

import { MINIPLEX_WORLD_TOKEN } from '~app/core/miniplex';


@Injectable()
export class ExtractHelperFactory implements OnDestroy {
    public static world: World | null = null;

    constructor(
        @Inject(MINIPLEX_WORLD_TOKEN)
        private readonly world: World,
    ) {
        ExtractHelperFactory.world = world;
    }

    ngOnDestroy(): void {
        ExtractHelperFactory.world = null;
    }
}
