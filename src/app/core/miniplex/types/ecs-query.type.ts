import { ArchetypeBucket, World } from 'miniplex';

export type EcsQueryType<T> = (w: World) => ArchetypeBucket<T>;
