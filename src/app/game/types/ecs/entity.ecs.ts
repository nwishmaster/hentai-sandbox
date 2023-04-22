import { EcsComponent } from '~app/game/types/ecs/component.ecs';
import { EcsId } from '~app/game/types/ecs/id.ecs';

export abstract class EcsEntity {
    readonly id!: EcsId;
    components!: EcsComponent[];
}
