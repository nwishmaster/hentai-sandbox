import { flatEntityToComponent } from '~app/core/miniplex/utils';
import { queryComponent } from '~app/core/miniplex/utils/query-component.util';

/**
 * @description extract first ECS component data obj.data => { ...data }
 *
 * @param {String} component name of the component (key of entity)
 * @return {PropertyDecorator}
 **/
export function ExtractOne<T extends object>(component: string): PropertyDecorator {
    return function(target: any, propertyKey: string | symbol) {
        const { entities } = queryComponent((w) => w.with('component'));

        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get(): T | null {
                return flatEntityToComponent(entities?.[0], component);
            },
        });
    };
}
