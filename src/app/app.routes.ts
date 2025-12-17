import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/pokedex',
        pathMatch: 'full' 
    },
    {
        path: 'pokedex',
        loadComponent: () => import('./screens/pokedex/pokedex').then(px => px.Pokedex)
    },
    {
        path: 'pokemon',
        loadComponent: () => import('./screens/pokemon/pokemon').then(pk => pk.Pokemon)
    }
];
