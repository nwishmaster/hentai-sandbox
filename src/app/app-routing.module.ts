import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'menu',
        loadChildren: () => import('./main/main.module').then(({ MainModule }) => MainModule),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'menu',
    },
    {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(({ GameModule }) => GameModule),
    },
    {
        path: '**',
        redirectTo: 'menu',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
