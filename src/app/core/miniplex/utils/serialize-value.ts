import { serializeEntity } from '~app/core/miniplex/utils/serialize-entity';

export function serializeValue(value: any): any {
    switch (true) {
        case value instanceof Array:
            return value.map(serializeValue);
        case value instanceof Date:
            return value.toISOString();
        case value instanceof Object:
            return serializeEntity(value);
        default:
            return value;
    }
}
