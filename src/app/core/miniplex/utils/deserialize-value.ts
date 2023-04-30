import { deserializeEntity } from '~app/core/miniplex/utils/deserialize-entity';

const dateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

export function deserializeValue(value: any): any {
    switch (true) {
        case value instanceof Array:
            return value.map(deserializeValue);
        case value instanceof String:
            dateRegex.lastIndex = 0;
            return dateRegex.test(value) ? new Date(value) : value;
        case value instanceof Object:
            return deserializeEntity(value);
        default:
            return value;
    }
}
