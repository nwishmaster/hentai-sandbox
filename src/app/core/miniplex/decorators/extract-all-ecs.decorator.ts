import { flatEntityToComponent } from '~app/core/miniplex/utils';
import { queryComponent } from '~app/core/miniplex/utils/query-component.util';

/**
 * @description extract array of ECS components data [objs].map(data => ({ ...data })>)
 *
 * @param {String} component name of the component (key of entity)
 * @return {PropertyDecorator}
 **/
export function ExtractAll<T extends object>(component: string): PropertyDecorator {
    return function(target: any, propertyKey: string | symbol) {
        const { entities } = queryComponent((w) => w.with(component));

        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get(): T[] {
                return entities?.map(flatEntityToComponent);
            },
        });
    };
}
