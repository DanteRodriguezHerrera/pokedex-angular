import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  imports: [SlicePipe],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.scss',
})
export class Pokedex {

  pokedex: any[] = Array.from({ length: 1025 }, (v, i) => i);

  pokedexPage = 1;
  numberOfPages: number[] = Array.from({length: Math.ceil(this.pokedex.length / 20)}, (v, i) => i)

}
