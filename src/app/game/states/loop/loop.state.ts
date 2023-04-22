import {
    Action,
    NgxsModule,
    Selector,
    State,
    StateContext,
} from '@ngxs/store';
import { Injectable, NgModule } from '@angular/core';

import { LoopStateInterface } from '~app/game/states/loop/loop-state.interface';
import { TickAction } from '~app/game/states/loop/actions';

@State<LoopStateInterface>({
    name: 'loop',
    defaults: {
        tick: null,
    },
})
@Injectable()
export class LoopState {
    @Selector()
    static tick({ tick }: LoopStateInterface) {
        return tick;
    }

    @Action(TickAction)
    tick({ patchState }: StateContext<LoopStateInterface>) {
        patchState({
            tick: new Date(),
        });
    }
}

@NgModule({
    imports: [
        NgxsModule.forFeature([LoopState]),
    ],
})
export class LoopStateModule {}
