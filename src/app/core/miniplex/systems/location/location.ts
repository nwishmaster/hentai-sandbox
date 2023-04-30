import { Id } from '~app/core/miniplex/systems/id';

export interface Location extends Id {
    location: string;
    rootLocation: Location[] | null;
    childrenLocations?: Location[] | null;
}
