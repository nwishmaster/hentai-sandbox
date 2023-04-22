import { EcsSystem } from '~app/game/types/ecs';

export class AddSystemAction {
    static readonly type = '[ECS] add system';
    constructor(
        public system: EcsSystem,
    ) {}
}
