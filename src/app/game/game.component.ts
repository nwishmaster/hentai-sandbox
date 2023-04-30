import { Component, Inject } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable, skip, tap } from 'rxjs';
import { Select } from '@ngxs/store';
import { World } from 'miniplex';
import { untilDestroyed } from '@ngneat/until-destroy';

import { BaseComponent } from '~app/core/components/base';
import { ControllableMarker } from '~app/core/miniplex/systems/controllable-marker';
import { DayCircle } from '~app/core/miniplex/systems/day-circle';
import { ENTITY_ID_KEY } from '~app/core/miniplex/systems/id';
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
        const player: ControllableMarker = { [ENTITY_ID_KEY]: 'PLAYER', isControllable: true };
        const initialLocation: Location = { [ENTITY_ID_KEY]: 'id-A', location: 'A', rootLocation: null };

        this.world.add<DayCircle>({ [ENTITY_ID_KEY]: 'global-time', worldTime: new Date('1163-01-01') });
        this.world.add<Location>({ [ENTITY_ID_KEY]: 'id-B', location: 'B', rootLocation: null });
        this.world.add<Location>({ [ENTITY_ID_KEY]: 'id-C', location: 'C', rootLocation: null });
        this.world.add<Location>({ [ENTITY_ID_KEY]: 'id-D', location: 'D', rootLocation: null });
        this.world.add<Location>(initialLocation);
        this.world.add(player);
        this.world.addComponent(player, 'location', initialLocation);

        this.world.remove({ [ENTITY_ID_KEY]: 'location-b', location: 'B', rootLocation: null });

        this.player = this.world.with('isControllable').entities[0];
        this.world.addComponent(player, 'gotoLocation', { [ENTITY_ID_KEY]: 'id-C', location: 'C', rootLocation: null });
    }

    getLocation(location: string): Location {
        const id = this.world.id({ [ENTITY_ID_KEY]: `id-${location}` });
        return id ? this.world.entity(id) : null;
    }

    onSave() {
        // TODO
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
