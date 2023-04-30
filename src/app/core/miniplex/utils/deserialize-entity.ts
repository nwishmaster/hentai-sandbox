import { ENTITY_ID_KEY, SERIALIZED_ENTITY_ID_KEY } from '~app/core/miniplex/systems/id';
import { Serializable } from '~app/core/miniplex/types';
import { deserializeValue } from '~app/core/miniplex/utils/deserialize-value';

export function deserializeEntity(entity: Serializable<any>): Serializable<any> {
    const { [SERIALIZED_ENTITY_ID_KEY]: idKey } = entity;
    const deserialized: any = { [ENTITY_ID_KEY]: idKey };

    for (const [key, value] of Object.entries(entity)) {
        deserialized[key] = deserializeValue(value);
    }

    return deserialized;
}
