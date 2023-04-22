import { EcsId } from '~app/game/types/ecs/id.ecs';

export abstract class EcsComponent {
    readonly id!: EcsId;
}
