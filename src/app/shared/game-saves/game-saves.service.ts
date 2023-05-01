import { Inject, Injectable } from '@angular/core';

import { GameSave } from '~app/shared/game-saves/game-save.interface';
import { SAVES_STORAGE } from '~app/shared/game-saves/game-saves.constans';
import { deserializeAll, serializeAll } from '~app/core/miniplex/utils';

interface SavesInterface {
    [index: string]: GameSave;
}

@Injectable({
    providedIn: 'root',
})
export class GameSavesService {
    private saves: SavesInterface | null = null;

    /** NOT serialized values only */
    private lastSave: GameSave | null = null;

    constructor(
        @Inject(SAVES_STORAGE) private readonly storage: Storage,
    ) {}

    private static serializeSave(save: GameSave): GameSave {
        return {
            ...save,
            entities: serializeAll(save.entities),
        };
    }

    private static deserializeSave(save: GameSave): GameSave {
        return {
            ...save,
            entities: deserializeAll(save.entities),
        };
    }

    private getSavesFromStorage(): SavesInterface {
        const storageSaves = JSON.parse(this.storage.getItem('saves') || '{}');

        for (const [index, save] of Object.entries<GameSave>(storageSaves)) {
            if (storageSaves[index]) {
                storageSaves[index] = {
                    ...save,
                    createdAt: new Date(save.createdAt),
                };
            }
        }

        return storageSaves;
    }

    getSaves() {
        if (this.saves) {
            return this.saves;
        }

        return this.saves = this.getSavesFromStorage();
    }

    getLastSave() {
        if (this.lastSave) {
            return this.lastSave;
        } else {
            const saves = this.getSaves();
            let minDateIndex = '-1';

            for (const [index, save] of Object.entries<GameSave>(saves)) {
                if (saves[minDateIndex]?.createdAt > save?.createdAt) {
                    minDateIndex = index;
                }
            }

            return this.lastSave = saves[minDateIndex]
                ? GameSavesService.deserializeSave(saves[minDateIndex])
                : null;
        }
    }

    setSave(index: number, save: GameSave): void {
        const serialized = GameSavesService.serializeSave(save);

        if (!this.saves) {
            this.saves = {};
        }

        this.saves[index] = serialized;
        this.lastSave = save;
        this.storage.setItem('saves', JSON.stringify(this.saves));
    }
}
