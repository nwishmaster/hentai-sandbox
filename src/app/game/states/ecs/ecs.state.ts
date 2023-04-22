import {
    Action,
    NgxsModule,
    Selector,
    State,
    StateContext,
} from '@ngxs/store';
import { Injectable, NgModule } from '@angular/core';
import { append, patch, updateItem } from '@ngxs/store/operators';

import {
    AddComponentsAction,
    AddEntityAction,
    AddSystemAction,
} from '~app/game/states/ecs/actions';
import { EcsStateInterface } from '~app/game/states/ecs';

@State<EcsStateInterface>({
    name: 'ecs',
    defaults: {
        entities: [],
        components: [],
        systems: [],
    },
})
@Injectable()
export class EcsState {
    @Selector()
    static entities({ entities }: EcsStateInterface) {
        return entities;
    }

    @Selector()
    static components({ components }: EcsStateInterface) {
        return components;
    }

    @Selector()
    static systems({ systems }: EcsStateInterface) {
        return systems;
    }

    @Action(AddEntityAction)
    addEntity({ setState }: StateContext<EcsStateInterface>, { entity }: AddEntityAction) {
        setState(
            patch({
                entities: append([entity]),
            })
        );
    }

    @Action(AddEntityAction)
    addComponents(
        { setState }: StateContext<EcsStateInterface>,
        { entity, components }: AddComponentsAction
    ) {
        entity.components = [...entity.components, ...components];
        setState(
            patch({
                entities: updateItem(({ id }) => id === entity.id, entity),
                components: append(components),
            })
        );
    }

    @Action(AddSystemAction)
    addSystem(
        { setState }: StateContext<EcsStateInterface>,
        { system }: AddSystemAction
    ) {
        setState(
            patch({
                systems: append([system]),
            })
        );
    }
}

@NgModule({
    imports: [
        NgxsModule.forFeature([EcsState]),
    ],
})
export class EcsCStateModule {}
