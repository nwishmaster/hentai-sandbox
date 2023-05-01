import { Component, Inject } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable, skip, tap } from 'rxjs';
import { Select } from '@ngxs/store';
import { World } from 'miniplex';
import { untilDestroyed } from '@ngneat/until-destroy';

import { BaseComponent } from '~app/core/components/base';
import { ENTITY_ID_KEY } from '~app/core/miniplex/systems/id';
import { ExtractOne } from '~app/core/miniplex/decorators';
import { GameSavesService } from '~app/shared/game-saves';
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
        private readonly gameSavesService: GameSavesService,
    ) {
        super();
    }

    protected override initValues() {
        this.player = this.world.with('isControllable').entities[0];
    }

    getLocation(location: string): Location {
        const id = this.world.id({ [ENTITY_ID_KEY]: `id-${location}` });
        return id ? this.world.entity(id) : null;
    }

    onSave() {
        this.gameSavesService.setSave(0, { entities: this.world.entities, createdAt: new Date() });
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
    onNextTurn(gotoLocation: string) {
        this.world.addComponent(this.player, 'gotoLocation', this.getLocation(gotoLocation));
        return new TickAction();
    }
}
