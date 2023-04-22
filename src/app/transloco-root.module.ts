import { HttpClient } from '@angular/common/http';
import {
    Injectable,
    NgModule,
    isDevMode,
} from '@angular/core';
import {
    TRANSLOCO_CONFIG,
    TRANSLOCO_LOADER,
    Translation,
    TranslocoLoader,
    TranslocoModule,
    translocoConfig,
} from '@ngneat/transloco';


@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    constructor(private http: HttpClient) {}

    getTranslation(lang: string) {
        return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
    }
}

@NgModule({
    exports: [TranslocoModule],
    providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: ['en', 'ru'],
                defaultLang: 'en',
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            }),
        },
        { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    ],
})
export class TranslocoRootModule {}
