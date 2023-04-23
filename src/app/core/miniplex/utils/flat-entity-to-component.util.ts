export function flatEntityToComponent<E>(entity: E, component: keyof E): E[keyof E] | null {
    if (!entity) return null;

    const { [component]: result } = entity;

    if (result || result === null) {
        return result;
    }

    throw new Error(`The entity "${entity}" has no "${component.toString()}" component`);
}
