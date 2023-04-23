import { NgModule } from '@angular/core';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from '~app/app.component';
import { AppRoutingModule } from '~app/app-routing.module';
import { CoreModule } from '~app/core/core.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CoreModule,
        AppRoutingModule,
        NgxsModule.forRoot([], {
            developmentMode: false,
        }),
        NgxsLoggerPluginModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
