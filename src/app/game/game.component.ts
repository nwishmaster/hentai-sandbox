import { Component, Inject } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable, skip, tap } from 'rxjs';
import { Select } from '@ngxs/store';
import { World } from 'miniplex';
import { untilDestroyed } from '@ngneat/until-destroy';

import { BaseComponent } from '~app/core/components/base';
import { DayCircle } from '~app/core/miniplex/systems/day-circle';
import { ExtractOne } from '~app/core/miniplex/decorators';
import { Location } from '~app/core/miniplex/systems/location';
import { LoopState, TickAction } from '~app/game/states/loop';
import { MINIPLEX_WORLD_TOKEN, MiniplexService } from 'src/app/core/miniplex';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent extends BaseComponent {
    @Select(LoopState.tick) tick$!: Observable<Date>;

    @ExtractOne('worldTime')
    worldTime!: Date;

    player!: any;

    constructor(
        @Inject(MINIPLEX_WORLD_TOKEN)
        private readonly world: World,
        private readonly miniplexService: MiniplexService,
    ) {
        super();
    }

    protected override initValues() {
        this.world.add<DayCircle>({ worldTime: new Date('1163-01-01') });
    }

    protected override initSubs() {
        this.tick$.pipe(
            untilDestroyed(this),
            // skip initial tick
            skip(1),
            tap(() => this.miniplexService.onUpdate()),
        ).subscribe();
    }

    @Dispatch()
    onNextTurn(gotoLocation: Location) {
        this.world.addComponent(this.player, 'gotoLocation', gotoLocation);
        return new TickAction();
    }
}
