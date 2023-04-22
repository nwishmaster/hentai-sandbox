import { EcsComponent, EcsEntity, EcsSystem } from '~app/game/types/ecs';

export interface EcsStateInterface {
    entities: EcsEntity[];
    components: EcsComponent[];
    systems: EcsSystem[];
}
