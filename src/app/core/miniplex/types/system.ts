import { World } from 'miniplex';

export abstract class EcsSystem<T extends object> {
    protected world: World<T>;

    constructor(world: World<T>) {
        this.world = world;
    }

    abstract query(): Iterable<T>;

    abstract onUpdate(): void
}
