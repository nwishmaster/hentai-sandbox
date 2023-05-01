import { Serializable } from '~app/core/miniplex/types';

export interface GameSave {
    entities: Array<Serializable<any>>;
    createdAt: Date;
}
