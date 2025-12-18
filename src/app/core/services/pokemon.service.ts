import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokedexResponse } from '../interfaces/pokedex.interface';
import { PokemonResponse } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  
  BASE_URL: string = 'https://pokeapi.co/api/v2/';

  constructor ( private http: HttpClient) {}

  getPokedex() : Observable<PokedexResponse> {

    return this.http.get<PokedexResponse>(this.BASE_URL + 'pokemon?limit=1025&offset=0');
  }

  getPokemon(pokemonId: number) : Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(this.BASE_URL + 'pokemon/' + pokemonId);
  }
}
