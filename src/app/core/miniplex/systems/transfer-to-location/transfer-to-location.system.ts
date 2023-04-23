import { EcsSystem } from '~app/core/miniplex/types';
import { TransferToLocation } from '~app/core/miniplex/systems/transfer-to-location/transfer-to-location';

export class TransferToLocationSystem extends EcsSystem<Location & TransferToLocation> {
    override query() {
        return this.world.with('location', 'gotoLocation');
    }

    override onUpdate() {
        for (const entity of this.query()) {
            entity.location = entity.gotoLocation;
            this.world.removeComponent(entity, 'gotoLocation');
        }
    }
}
