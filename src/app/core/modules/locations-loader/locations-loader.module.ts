import { NgModule } from '@angular/core';

import { GAME_LOCATIONS } from '~app/core/modules/locations-loader/locations-loader.constans';
import { loadGameLocations } from '~app/core/utils';


@NgModule({
    providers: [
        { provide: GAME_LOCATIONS, useFactory: loadGameLocations },
    ],
})
export class LocationsLoaderModule {}
