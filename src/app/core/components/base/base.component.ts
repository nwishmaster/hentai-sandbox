/* eslint-disable @typescript-eslint/no-empty-function */

import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'app-base',
    template: '',
})
export class BaseComponent implements OnInit {
    protected initValues(): void {}
    protected initSubs(): void {}

    ngOnInit() {
        this.initValues();
        this.initSubs();
    }
}
