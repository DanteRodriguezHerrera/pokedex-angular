import { SlicePipe, NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokedexResponse, Result } from '../../core/interfaces/pokedex.interface';
import { range } from 'rxjs';
import { PokemonResponse } from '../../core/interfaces/pokemon.interface';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UpperFirstLetterPipe } from '../../utils/pipes/upper-first-letter-pipe';

@Component({
  selector: 'app-pokedex',
  imports: [SlicePipe, FormsModule, NgClass, RouterLink, UpperFirstLetterPipe],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.scss',
})
export class Pokedex implements OnInit{

  isLoading = signal(0)

  pokedex: Result[] = [];
  filteredPokedex: Result[] = [];

  pokedexPage = 1;
  numberOfPages: number[] = []

  imagesIndex: number[] = [];

  pokemonTypes: any[] = [];

  searchPokemon: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokedex()
  }

  getPokedex() {
    this.pokemonService.getPokedex().subscribe({
      next: (res: PokedexResponse) => {
        res.results.map((entry, i) => {
          entry.id = i + 1;
          entry.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`;
        })

        this.pokedex = res.results;
        this.filteredPokedex = res.results;
        this.numberOfPages = Array.from({length: Math.ceil(this.filteredPokedex.length / 20)}, (v, i) => i)

        this.getPokemonTypes();
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getPokemonTypes() {
    this.pokemonTypes = [];

    range(1, 1025).subscribe({
      next: res => {
        this.pokemonService.getPokemon(res).subscribe({
          next: (res: PokemonResponse) => {
            // console.log(res.types)
            this.pokemonTypes.push(res.types)
            this.isLoading.update(i => i + 1)
            if(this.pokemonTypes.length == 1025) {
              this.filteredPokedex.map((pokemon, i) => {
                pokemon.types = this.pokemonTypes[i]
                this.scrollPage(1)
              })              
            }
          },
          error: err => {
            console.log(err)
          }
        })
      }
    })
  }

  filterPokedex() {

    this.pokedexPage = 1;

    if(this.searchPokemon == ''){
      this.filteredPokedex = this.pokedex;
      this.numberOfPages = Array.from({length: Math.ceil(this.pokedex.length / 20)}, (v, i) => i);
    }
    else {
      this.filteredPokedex = this.pokedex.filter(pokemon => {
        return (pokemon.name + ' ').toLowerCase().includes(this.searchPokemon)
      })

      this.numberOfPages = Array.from({length: Math.ceil(this.filteredPokedex.length / 20)}, (v, i) => i)
    }
  }

  scrollPage(index: number) {

    const page = document.getElementById(index.toString())

    if(page) {
      page.scrollIntoView()
      // page.style.background = 'orange'
    }
  }
}
