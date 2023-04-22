import { EcsId } from '~app/game/types/ecs/id.ecs';

export abstract class EcsSystem {
    readonly id!: EcsId;

    abstract onUpdate(): void;
}
