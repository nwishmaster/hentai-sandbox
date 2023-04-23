import { addHours } from 'date-fns';

import { DayCircle } from '~app/core/miniplex/systems/day-circle/day-circle';
import { EcsSystem } from '~app/core/miniplex/types';

export class DayCircleSystem extends EcsSystem<DayCircle> {
    override query() {
        return this.world.archetype('worldTime');
    }

    override onUpdate() {
        for (const entity of this.query()) {
            entity.worldTime = addHours(entity.worldTime, 1);
        }
    }
}
