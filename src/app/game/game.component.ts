import { Component } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Select } from '@ngxs/store';
import { untilDestroyed } from '@ngneat/until-destroy';

import { BaseComponent } from '~app/core/components/base';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { EcsState } from '~app/game/states/ecs';
import { EcsSystem } from '~app/game/types/ecs';
import { LoopState, TickAction } from '~app/game/states/loop';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent extends BaseComponent {
    @Select(LoopState.tick) tick$!: Observable<Date>;
    @Select(EcsState.systems) systems$!: Observable<EcsSystem[]>;

    protected override initSubs() {
        this.tick$.pipe(
            untilDestroyed(this),
            switchMap(() => this.systems$),
            tap((systems) => {
                for (const system of systems) {
                    system.onUpdate();
                }
            }),
        );
    }

    @Dispatch()
    onNextClick() {
        return new TickAction();
    }
}
