import { ArchetypeBucket, World } from 'miniplex';
import { ExtractHelperFactory } from '~app/core/miniplex/decorators/extract-helper.factory';

export function queryComponent<T>(query: (w: World) => ArchetypeBucket<T>) {
    const { world } = ExtractHelperFactory as { world: World | null };

    if (!world) {
        throw new Error('Cannot access ECS world');
    }

    return query(world);
}
