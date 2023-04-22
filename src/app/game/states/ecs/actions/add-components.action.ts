import { EcsComponent, EcsEntity } from '~app/game/types/ecs';

export class AddComponentsAction {
    static readonly type = '[ECS] add component to entity';
    constructor(
        public entity: EcsEntity,
        public components: EcsComponent[],
    ) {}
}
