export interface Serializable<T extends object> {
    [component: string | symbol]: T;
}
