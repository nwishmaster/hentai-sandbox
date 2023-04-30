import { ENTITY_ID_KEY, SERIALIZED_ENTITY_ID_KEY } from '~app/core/miniplex/systems/id';
import { Serializable } from '~app/core/miniplex/types';

export function restoreEntityId(
    entity: Serializable<any>,
    idToEntities: Map<string, Serializable<any>>,
    depth = 0,
): Serializable<any> {
    if (depth === 0) {
        entity[ENTITY_ID_KEY] = entity[SERIALIZED_ENTITY_ID_KEY];
        delete entity[SERIALIZED_ENTITY_ID_KEY];
    } else {
        return idToEntities.get(entity[SERIALIZED_ENTITY_ID_KEY]) as Serializable<any>;
    }

    for (const [key, value] of Object.entries(entity)) {
        if (value instanceof Array) {
            entity[key] = value?.[0] instanceof Object
                ? value.map((v) => restoreEntityId(v, idToEntities, depth + 1))
                : value;
        }

        if (value instanceof Object && value?.[SERIALIZED_ENTITY_ID_KEY]) {
            entity[key] = restoreEntityId(value, idToEntities, depth + 1);
        }
    }

    return entity;
}
