export interface Location {
    location: string;
    rootLocation: Location[] | null;
    childrenLocations?: Location[] | null;
}
