import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { TranslocoRootModule } from '~app/transloco-root.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        TranslocoRootModule,
    ],
})
export class CoreModule {}
