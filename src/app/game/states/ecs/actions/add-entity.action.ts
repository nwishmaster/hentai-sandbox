import { EcsEntity } from '~app/game/types/ecs';

export class AddEntityAction {
    static readonly type = '[ECS] add entity';
    constructor(
        public entity: EcsEntity,
    ) {}
}
