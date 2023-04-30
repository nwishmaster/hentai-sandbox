import { SERIALIZED_ENTITY_ID_KEY } from '~app/core/miniplex/systems/id';
import { Serializable } from '~app/core/miniplex/types';
import { deserializeEntity } from '~app/core/miniplex/utils/deserialize-entity';
import { restoreEntityId } from '~app/core/miniplex/utils/restore-entity-id';

export function deserializeAll(serialized: object[]): Array<Serializable<any>> {
    let entities: Array<Serializable<any>> = [];

    try {
        const rawEntities: Serializable<any>[] = serialized.map(deserializeEntity);
        const firstIterationDeserialized: Serializable<any>[] = [];
        const idToEntityMap = new Map<string, Serializable<any>>();

        for (const raw of rawEntities) {
            const fid = deserializeEntity(raw);
            idToEntityMap.set(fid[SERIALIZED_ENTITY_ID_KEY], fid);
            firstIterationDeserialized.push(fid);
        }

        entities = firstIterationDeserialized.map((fid) => restoreEntityId(fid, idToEntityMap));
    } catch (e) {
        throw new Error(`Cannot deserialize "${serialized}"`);
    }

    return entities;
}
