import { ENTITY_ID_KEY, SERIALIZED_ENTITY_ID_KEY } from '~app/core/miniplex/systems/id';
import { Serializable } from '~app/core/miniplex/types';
import { serializeValue } from '~app/core/miniplex/utils/serialize-value';

export function serializeEntity(entity: Serializable<any>): object {
    const { [ENTITY_ID_KEY]: idKey } = entity;
    const serialized: any = { [SERIALIZED_ENTITY_ID_KEY]: idKey };

    for (const [key, value] of Object.entries(entity)) {
        serialized[key] = value instanceof Object && value?.[ENTITY_ID_KEY]
            ? { [SERIALIZED_ENTITY_ID_KEY]: value?.[ENTITY_ID_KEY] }
            : serializeValue(value);
    }

    return serialized;
}
