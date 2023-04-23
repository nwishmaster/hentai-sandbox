import { Inject, Injectable } from '@angular/core';
import { World } from 'miniplex';

import { ConstructorType } from '~app/game/types/constructor.type';
import { EcsSystem } from '~app/core/miniplex/types';
import { MINIPLEX_SYSTEMS_TOKEN, MINIPLEX_WORLD_TOKEN } from '~app/core/miniplex/miniplex.contants';

@Injectable({
    providedIn: 'root',
})
export class MiniplexService {
    systems: Array<EcsSystem<any>> = [];

    constructor(
      @Inject(MINIPLEX_WORLD_TOKEN)
      private readonly world: World,
      @Inject(MINIPLEX_SYSTEMS_TOKEN)
      private readonly essentialSystems: Array<ConstructorType<any>>,
    ) {
        for (const system of this.essentialSystems) {
            this.systems.push(new system(this.world));
        }
    }

    onUpdate(): void {
        for (const system of this.systems) {
            system.onUpdate();
        }
    }
}
