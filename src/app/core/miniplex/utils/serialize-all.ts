import { Serializable } from '~app/core/miniplex/types';
import { serializeEntity } from '~app/core/miniplex/utils/serialize-entity';

export function serializeAll(entities: Array<Serializable<any>>): object[] {
    return entities.map(serializeEntity);
}
