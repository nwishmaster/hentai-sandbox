import { World } from 'miniplex';

export type MiniplexSystemType<W extends object> = (world: World<W>) => void;
