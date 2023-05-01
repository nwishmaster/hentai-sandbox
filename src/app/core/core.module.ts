import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DateFnsModule } from 'ngx-date-fns';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LocationsLoaderModule } from '~app/core/modules/locations-loader';
import { MiniplexModule } from 'src/app/core/miniplex';
import { TranslocoRootModule } from '~app/transloco-root.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        TranslocoRootModule,
        MiniplexModule,
        LocationsLoaderModule,
        DateFnsModule.forRoot(),
    ],
})
export class CoreModule {}
