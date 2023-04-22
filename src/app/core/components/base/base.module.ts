import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseComponent } from '~app/core/components/base/base.component';

@NgModule({
    declarations: [
        BaseComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class BaseModule {}
