import { Type } from "./pokemon.interface";

export interface PokedexResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    id: number;
    name: string;
    url:  string;
    types: Type[];
}
