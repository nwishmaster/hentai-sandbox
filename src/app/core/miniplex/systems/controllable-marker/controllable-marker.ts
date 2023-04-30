import { Id } from '~app/core/miniplex/systems/id';

export interface ControllableMarker extends Id {
    isControllable: boolean;
}
